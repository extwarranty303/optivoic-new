import { supabase } from '../supabaseClient';

const LOCAL_KEY = 'optivoic_saved_articles';

// In-memory cache for ultra-fast UI rendering
let cachedBookmarks = null;

/**
 * Fetch bookmarks from Supabase (if logged in) or LocalStorage (if guest)
 */
export const fetchBookmarks = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (session && session.user) {
      // Logged in: Fetch from Supabase user_bookmarks table
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
    console.warn("Supabase bookmark fetch note:", err.message);
  }

  // Fallback to LocalStorage for guests or offline mode
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cachedBookmarks = Array.isArray(parsed) ? parsed : [];
    return cachedBookmarks;
  } catch (e) {
    return [];
  }
};

/**
 * Synchronously return cached bookmarks or LocalStorage fallback
 */
export const getBookmarksSync = () => {
  if (cachedBookmarks) return cachedBookmarks;
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

/**
 * Check if a post slug is bookmarked
 */
export const isBookmarked = (slug) => {
  if (!slug) return false;
  const list = getBookmarksSync();
  return list.some(item => item.slug === slug);
};

/**
 * Toggle bookmark state (Supabase database if logged in, LocalStorage if guest)
 */
export const toggleBookmark = async (post) => {
  if (!post || !post.slug) return false;

  let isNowSaved = false;
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (session && session.user) {
      // Check existing row in Supabase
      const { data: existing } = await supabase
        .from('user_bookmarks')
        .select('id')
        .eq('post_slug', post.slug)
        .or(`user_id.eq.${session.user.id},user_email.ilike.${session.user.email}`)
        .maybeSingle();

      if (existing) {
        // Remove from Supabase
        await supabase
          .from('user_bookmarks')
          .delete()
          .eq('id', existing.id);
        isNowSaved = false;
      } else {
        // Insert into Supabase
        await supabase
          .from('user_bookmarks')
          .insert({
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

      // Refresh cache from Supabase
      await fetchBookmarks();
    } else {
      // LocalStorage for guest
      const list = getBookmarksSync();
      const exists = list.some(item => item.slug === post.slug);
      let updated = [];
      if (exists) {
        updated = list.filter(item => item.slug !== post.slug);
        isNowSaved = false;
      } else {
        const item = {
          id: post.id || post.slug,
          slug: post.slug,
          title: post.title,
          category: post.category || 'Business Strategy',
          excerpt: post.excerpt || post.meta_description || '',
          featured_image: post.featured_image || null,
          saved_at: new Date().toISOString()
        };
        updated = [item, ...list];
        isNowSaved = true;
      }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      cachedBookmarks = updated;
    }
  } catch (err) {
    console.error("Bookmark toggle error:", err);
  }

  // Dispatch custom window event for real-time component updates
  window.dispatchEvent(new CustomEvent('optivoic_bookmarks_updated', { detail: { slug: post.slug, isSaved: isNowSaved } }));
  return isNowSaved;
};
