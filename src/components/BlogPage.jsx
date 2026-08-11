import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { supabase } from '../supabaseClient';
import { BLOG_CATEGORIES } from './BlogAdmin';
import { fetchBookmarks, isBookmarked, toggleBookmark } from '../utils/bookmarkManager';
import AuthModal from './AuthModal';
import AdSenseBanner from './AdSenseBanner';

const SEED_POSTS = [
  {
    id: 'seed-1',
    slug: 'scaling-reseller-operations-with-automated-frameworks',
    title: 'Scaling Reseller Operations with Turnkey Automated Frameworks',
    category: 'Business Templates',
    tags: 'reseller, templates, inventory, profit-tracking',
    excerpt: 'Discover how top-performing reselling enterprises track inventory, calculate profit margins automatically, and streamline multi-channel fulfillment.',
    content: '<h2>The Reseller Profit Trap</h2><p>Managing inventory across multiple marketplaces can quickly become overwhelming without structured systems. Modern reselling requires automated profit tracking, live inventory updates, and clear cash flow visibility.</p><h2>Building an Operational Command Center</h2><p>With structured spreadsheet frameworks and automated data calculation, reseller business owners save 10+ hours per week while eliminating manual entry errors.</p>',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'published',
    read_time: '4 min read',
    featured_image: 'https://wekjabmdztgkhfszgyeg.supabase.co/storage/v1/object/public/general/gemini-reseller-collage.png'
  },
  {
    id: 'seed-2',
    slug: '1099-executive-tax-estimation-strategies',
    title: '1099 Executive Tax Allocation: Quarter-by-Quarter Blueprint',
    category: 'Business Systems & Productivity',
    tags: '1099-tax, contractor, spreadsheet, finance',
    excerpt: 'A practical framework for freelancers, contractors, and agency founders to estimate quarterly taxes, track deductions, and preserve liquidity.',
    content: '<h2>Why Quarterly Tax Estimation Matters</h2><p>Contractors often face end-of-year tax shock. By automating tax allocations into dedicated buckets upon every invoice payment, business owners remain 100% tax compliant without cash flow surprises.</p>',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'published',
    read_time: '5 min read'
  },
  {
    id: 'seed-3',
    slug: 'ai-automation-for-modern-consulting-agencies',
    title: 'How AI Automation Elevates Client Delivery & Agency Operations',
    category: 'Consulting',
    tags: 'AI, consulting, automation, workflows',
    excerpt: 'Learn how technology consulting agencies integrate AI workflows to automate reporting, audit software vendors, and accelerate project delivery.',
    content: '<h2>The Shift to AI-Powered Agency Workflows</h2><p>Artificial Intelligence is no longer optional for high-growth agencies. By codifying recurring workflows into smart templates and automated scripts, teams deliver higher ROI for clients in half the time.</p>',
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
    status: 'published',
    read_time: '6 min read'
  }
];

// Color system per category
const CATEGORY_COLORS = {
  'Business Templates':           { color: '#22d3ee', bg: 'rgba(34,211,238,0.1)',  border: 'rgba(34,211,238,0.3)',  gradient: 'from-cyan-900/40 to-blue-900/40' },
  'Business Systems & Productivity': { color: '#fb923c', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.3)', gradient: 'from-orange-900/40 to-amber-900/40' },
  'Consulting':                   { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)', gradient: 'from-violet-900/40 to-purple-900/40' },
  'AI & Automation':              { color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.3)', gradient: 'from-pink-900/40 to-rose-900/40' },
  'Finance & Tax':                { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)',  gradient: 'from-emerald-900/40 to-teal-900/40' },
};

function getCatStyle(category) {
  return CATEGORY_COLORS[category] || { color: '#38bdf8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.3)', gradient: 'from-sky-900/40 to-blue-900/40' };
}

// Animated card that slides up on mount
function BlogCard({ post, index, savedSlugs, onBookmark }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const cat = getCatStyle(post.category);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`blog-card-glow rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col h-full overflow-hidden ${visible ? 'blog-card-reveal' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image or gradient placeholder */}
      {post.featured_image ? (
        <div className="w-full h-48 relative overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.image_alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <span
            className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}
          >
            {post.category || 'Article'}
          </span>
        </div>
      ) : (
        <div className={`w-full h-28 relative overflow-hidden bg-gradient-to-br ${cat.gradient}`}>
          <div className="absolute inset-0 flex items-center px-6 opacity-20">
            <span className="text-6xl font-black uppercase tracking-widest text-white truncate">{post.category || 'BLOG'}</span>
          </div>
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 50%, ${cat.color}22 0%, transparent 70%)` }} />
          <span
            className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}
          >
            {post.category || 'Article'}
          </span>
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-[11px] text-gray-500">
            {post.read_time && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                {post.read_time}
              </span>
            )}
            <span>{new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <button
            onClick={(e) => onBookmark(e, post)}
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all cursor-pointer flex items-center gap-1 ${savedSlugs[post.slug] ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300 shadow-[0_0_10px_rgba(234,179,8,0.2)]' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
            title={savedSlugs[post.slug] ? 'Saved in Knowledge Vault' : 'Bookmark to Knowledge Vault'}
          >
            {savedSlugs[post.slug] ? '⭐ Saved' : '☆ Save'}
          </button>
        </div>

        <h2 className="text-lg font-bold mb-2 text-white leading-snug" style={{ transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = cat.color}
          onMouseLeave={e => e.currentTarget.style.color = ''}
        >
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
              <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-gray-600 font-medium">Optivoic Editorial</span>
          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all hover:gap-2"
            style={{ color: cat.color }}
          >
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
}

// Large Editorial Spotlight card (first/featured post)
function FeaturedCard({ post, savedSlugs, onBookmark }) {
  const cat = getCatStyle(post.category);

  return (
    <article className="blog-card-glow rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden blog-card-reveal">
      <div className="md:flex">
        {/* Image side */}
        <div className="md:w-1/2 relative overflow-hidden min-h-[280px]">
          {post.featured_image ? (
            <>
              <img
                src={post.featured_image}
                alt={post.image_alt || post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 md:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden" />
            </>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <span className="text-9xl font-black uppercase text-white">{(post.category || 'BLOG').slice(0,2)}</span>
              </div>
              <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${cat.color}20 0%, transparent 70%)` }} />
            </div>
          )}
          {/* "FEATURED" badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cat.color }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Featured Story</span>
          </div>
        </div>

        {/* Content side */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span
            className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 self-start"
            style={{ background: cat.bg, border: `1px solid ${cat.border}`, color: cat.color }}
          >
            {post.category || 'Article'}
          </span>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mb-3 leading-tight">
            <Link to={`/blog/${post.slug}`} className="hover:opacity-80 transition-opacity">
              {post.title}
            </Link>
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to={`/blog/${post.slug}`}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-black transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: `linear-gradient(135deg, ${cat.color}, #818cf8)`, boxShadow: `0 0 20px ${cat.color}33` }}
            >
              Read Full Article →
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {post.read_time && <span>📖 {post.read_time}</span>}
              <span>{new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <button
              onClick={(e) => onBookmark(e, post)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${savedSlugs[post.slug] ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
            >
              {savedSlugs[post.slug] ? '⭐ Saved' : '☆ Save'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedSlugs, setSavedSlugs] = useState({});
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pendingPost, setPendingPost] = useState(null);
  const [loginReason, setLoginReason] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(SEED_POSTS);
        }
      } catch (err) {
        console.error('Error loading blog posts:', err);
        setPosts(SEED_POSTS);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const updateSlugs = async () => {
      await fetchBookmarks();
      const map = {};
      posts.forEach(p => { if (p.slug) map[p.slug] = isBookmarked(p.slug); });
      setSavedSlugs(map);
    };
    updateSlugs();
    window.addEventListener('optivoic_bookmarks_updated', updateSlugs);
    return () => window.removeEventListener('optivoic_bookmarks_updated', updateSlugs);
  }, [posts]);

  const handleCardBookmark = async (e, post) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await toggleBookmark(post);
    if (result.requiresAuth) {
      setPendingPost(post);
      setLoginReason('Save articles to your personal Knowledge Vault — accessible from any device.');
      setAuthModalOpen(true);
      return;
    }
    if (result.success) {
      setSavedSlugs(prev => ({ ...prev, [post.slug]: result.saved }));
    }
  };

  // After successful login, complete the pending bookmark save
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN') && pendingPost && session) {
        const result = await toggleBookmark(pendingPost);
        if (result.success) {
          setSavedSlugs(prev => ({ ...prev, [pendingPost.slug]: result.saved }));
        }
        setPendingPost(null);
        setAuthModalOpen(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [pendingPost]);

  usePageMeta({
    title: 'Blog & Insights | Optivoic Technology Consulting & Systems',
    description: 'Explore expert insights, AI automation blueprints, reseller frameworks, and business optimization tools from the Optivoic engineering team.',
    keywords: 'technology consulting agency, AI automation agency, blog, reseller templates, business frameworks',
    canonical: 'https://www.optivoic.com/blog',
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Optivoic Blog',
      description: 'Practical content for growth-minded teams focused on technology consulting, AI automation, and reseller systems.',
      url: 'https://www.optivoic.com/blog'
    }
  });

  const categories = ['All', ...BLOG_CATEGORIES];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Split featured (first) from the rest
  const featuredPost = filteredPosts[0] || null;
  const remainingPosts = filteredPosts.slice(1);

  // Unique categories in displayed posts
  const activeCategoryCount = new Set(filteredPosts.map(p => p.category).filter(Boolean)).size;

  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-hidden">

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 md:px-8 max-w-6xl mx-auto">

        {/* Decorative background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Giant decorative BG text */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] md:text-[260px] font-black uppercase tracking-tighter text-white opacity-[0.018] select-none whitespace-nowrap">
            BLOG
          </span>
        </div>

        <div className="relative z-10 text-center md:text-left">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Optivoic Insights & Knowledge Hub</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
            Practical Content for<br className="hidden md:inline" />{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
              Growth-Minded Teams
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed mb-10">
            Production-tested strategies, operational blueprints, AI automation frameworks, and deep-dives on scaling digital businesses.
          </p>

          {/* Stats bar */}
          {!loading && (
            <div className="flex flex-wrap gap-6 mb-10 justify-center md:justify-start">
              {[
                { label: 'Articles Published', value: posts.length },
                { label: 'Categories', value: new Set(posts.map(p => p.category).filter(Boolean)).size },
                { label: 'Updated', value: 'Weekly' },
              ].map(({ label, value }) => (
                <div key={label} className="text-center md:text-left">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Search & Category Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((cat) => {
                const cs = getCatStyle(cat);
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer"
                    style={isActive
                      ? { background: cs.bg, border: `1px solid ${cs.border}`, color: cs.color, boxShadow: `0 0 15px ${cs.color}40` }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#9ca3af' }
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-80">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search by keyword, tag, or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 placeholder-gray-500 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Article Grid ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16">

        {loading ? (
          /* Skeleton loader */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden animate-pulse">
                <div className="h-48 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                  <div className="h-5 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded" />
                  <div className="h-3 bg-white/5 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-3xl">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-gray-400 mb-2">No articles found</p>
            <p className="text-sm text-gray-600">Try adjusting your search query or selecting another category.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 px-5 py-2 rounded-full border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/25 transition-all"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured spotlight — shown when no specific search/filter */}
            {featuredPost && (
              <FeaturedCard post={featuredPost} savedSlugs={savedSlugs} onBookmark={handleCardBookmark} />
            )}

            {/* Results count when filtering */}
            {(searchQuery || activeCategory !== 'All') && (
              <p className="text-sm text-gray-500 font-medium">
                Showing <span className="text-white font-bold">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && <> in <span className="text-cyan-300">{activeCategory}</span></>}
                {searchQuery && <> for "<span className="text-cyan-300">{searchQuery}</span>"</>}
              </p>
            )}

            {/* Remaining cards grid */}
            {remainingPosts.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post, index) => (
                  <BlogCard
                    key={post.id || post.slug}
                    post={post}
                    index={index}
                    savedSlugs={savedSlugs}
                    onBookmark={handleCardBookmark}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Google AdSense Banner ─────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 my-6">
        <AdSenseBanner className="text-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4" />
      </div>

      {/* ── Newsletter / CTA Banner ──────────────────────────────────── */}
      {!loading && posts.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 p-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-violet-900/20" />
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)', filter: 'blur(40px)' }} />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)', filter: 'blur(40px)' }} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Ready to optimize your operations?</h2>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">Explore production-grade templates and systems built for growth-minded teams in our digital marketplace.</p>
              <Link
                to="/marketplace#digital-marketplace"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-black transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #818cf8)', boxShadow: '0 0 30px rgba(34,211,238,0.3)' }}
              >
                Browse the Marketplace →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Auth Modal (shown when guest tries to save an article) ──── */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => { setAuthModalOpen(false); setPendingPost(null); }}
        redirectTo="/blog"
        subtitle={loginReason}
      />

    </div>
  );
}
