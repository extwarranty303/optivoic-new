import { supabase } from '../supabaseClient';

// In-memory cache for ultra-fast UI rendering
let cachedBookmarks = null;

/**
 * Fetch bookmarks from Supabase (logged-in users only).
 * Returns empty array for guests — no localStorage fallback.
 */
export const fetchBookmarks = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (session && session.user) {
      const { data: remoteData, error } = await supabase
        .from('user_bookmarks')
        .select('*')
        .or(`user_id.eq.${session.user.id},user_email.ilike.${session.user.email}`)
        .order('created_at', { ascending: false });

      if (!error && remoteData) {
        const formatted = remoteData.map(item => ({
          id: item.id,
          slug: item.post_slug,
          title: item.post_title,
          category: item.post_category,
          excerpt: item.post_excerpt,
          featured_image: item.post_image,
          created_at: item.created_at,
          saved_at: item.created_at
        }));
        cachedBookmarks = formatted;
        return formatted;
      }
    }
  } catch (err) {
    console.warn('Supabase bookmark fetch note:', err.message);
  }

  // Guests get an empty list (no localStorage fallback)
  cachedBookmarks = [];
  return [];
};

/**
 * Synchronously return cached bookmarks.
 */
export const getBookmarksSync = () => {
  return cachedBookmarks || [];
};

/**
 * Check if a post slug is bookmarked (only meaningful for logged-in users).
 */
export const isBookmarked = (slug) => {
  if (!slug) return false;
  const list = getBookmarksSync();
  return list.some(item => item.slug === slug);
};

/**
 * Check whether the current visitor is authenticated.
 * Returns the session or null.
 */
export const getAuthSession = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch {
    return null;
  }
};

/**
 * Toggle bookmark for authenticated users only.
 * Returns:
 *   { success: true, saved: boolean }  — for logged-in users
 *   { success: false, requiresAuth: true } — for guests (caller should open auth modal)
 */
export const toggleBookmark = async (post) => {
  if (!post || !post.slug) return { success: false, requiresAuth: false };

  try {
    const session = await getAuthSession();

    if (!session || !session.user) {
      // Not logged in — signal caller to show auth modal
      return { success: false, requiresAuth: true };
    }

    // Check existing row
    const { data: existing } = await supabase
      .from('user_bookmarks')
      .select('id')
      .eq('post_slug', post.slug)
      .or(`user_id.eq.${session.user.id},user_email.ilike.${session.user.email}`)
      .maybeSingle();

    let isNowSaved = false;

    if (existing) {
      // Remove
      await supabase.from('user_bookmarks').delete().eq('id', existing.id);
      isNowSaved = false;
    } else {
      // Insert
      await supabase.from('user_bookmarks').insert({
        user_id: session.user.id,
        user_email: session.user.email,
        post_slug: post.slug,
        post_title: post.title || '',
        post_category: post.category || 'Business Strategy',
        post_excerpt: post.excerpt || post.meta_description || '',
        post_image: post.featured_image || null
      });
      isNowSaved = true;
    }

    // Refresh cache
    await fetchBookmarks();

    window.dispatchEvent(new CustomEvent('optivoic_bookmarks_updated', {
      detail: { slug: post.slug, isSaved: isNowSaved }
    }));

    return { success: true, saved: isNowSaved };
  } catch (err) {
    console.error('Bookmark toggle error:', err);
    return { success: false, requiresAuth: false };
  }
};
