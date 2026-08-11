import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { supabase } from '../supabaseClient';
import { fetchBookmarks, isBookmarked, toggleBookmark } from '../utils/bookmarkManager';
import AuthModal from './AuthModal';
import AdSenseBanner from './AdSenseBanner';

const SEED_POSTS_MAP = {
  'scaling-reseller-operations-with-automated-frameworks': {
    id: 'seed-1',
    slug: 'scaling-reseller-operations-with-automated-frameworks',
    title: 'Scaling Reseller Operations with Turnkey Automated Frameworks',
    category: 'Business Templates',
    tags: 'reseller, templates, inventory, profit-tracking',
    excerpt: 'Discover how top-performing reselling enterprises track inventory, calculate profit margins automatically, and streamline multi-channel fulfillment.',
    content: `
      <p class="lead">Managing an enterprise-grade reselling operation requires total clarity on live inventory, supplier costs, and net margins. Without a structured command center, small accounting discrepancies snowball into massive operational inefficiencies.</p>
      
      <h2>1. The Hidden Bottleneck in Multi-Channel Reselling</h2>
      <p>As reselling businesses scale across platforms like eBay, Poshmark, and Shopify, maintaining unified accounting becomes complex. Manual spreadsheet tracking often leads to untracked fees, unallocated shipping overheads, and missed tax write-offs.</p>

      <blockquote>"Operational clarity isn't just about recording sales — it's about knowing your exact net margin per item in real-time."</blockquote>

      <h2>2. Automating Inventory & Profit Calculations</h2>
      <p>By implementing a turnkey <strong>Reseller Command Center</strong>, sellers automate formulaic calculations including:</p>
      <ul>
        <li><strong>Gross vs. Net Margin Tracking:</strong> Automatically deduct platform commissions and shipping expenses.</li>
        <li><strong>Aging Inventory Alerts:</strong> Highlight products sitting over 60 days to trigger promotional liquidation.</li>
        <li><strong>Tax Allocation Buckets:</strong> Automatically reserve a percentage of every sale for year-end tax compliance.</li>
      </ul>

      <h2>3. Long-Term Scalability & Growth</h2>
      <p>With structured workflows, agency founders and individual resellers spend less time wrestling spreadsheets and more time sourcing high-margin inventory.</p>
    `,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'published',
    read_time: '4 min read',
    meta_description: 'Discover how top-performing reselling enterprises track inventory and calculate profit margins automatically with Optivoic frameworks.',
    keywords: 'reseller templates, inventory tracking, business frameworks, reselling software',
    featured_image: 'https://wekjabmdztgkhfszgyeg.supabase.co/storage/v1/object/public/general/gemini-reseller-collage.png'
  },
  '1099-executive-tax-estimation-strategies': {
    id: 'seed-2',
    slug: '1099-executive-tax-estimation-strategies',
    title: '1099 Executive Tax Allocation: Quarter-by-Quarter Blueprint',
    category: 'Business Systems & Productivity',
    tags: '1099-tax, contractor, spreadsheet, finance',
    excerpt: 'A practical framework for freelancers, contractors, and agency founders to estimate quarterly taxes, track deductions, and preserve liquidity.',
    content: `
      <p>Managing taxes as an independent contractor or 1099 executive demands proactive cash allocation. Waiting until April 15th to calculate liability risks severe penalties and unnecessary cash flow stress.</p>

      <h2>The 30% Bucket Rule</h2>
      <p>A simple yet effective strategy is reserving 25-30% of every incoming client invoice into a high-yield business savings account reserved exclusively for estimated quarterly tax payments.</p>

      <h2>Key Tax Deductions to Track</h2>
      <ul>
        <li>Software subscriptions and API tooling expenses.</li>
        <li>Home office square-footage allocations.</li>
        <li>Professional equipment and hardware depreciation.</li>
      </ul>
    `,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'published',
    read_time: '5 min read',
    meta_description: 'A practical framework for freelancers and agency founders to estimate quarterly taxes and track deductions.',
    keywords: '1099 tax estimation, contractor tax template, business financial planning'
  },
  'ai-automation-for-modern-consulting-agencies': {
    id: 'seed-3',
    slug: 'ai-automation-for-modern-consulting-agencies',
    title: 'How AI Automation Elevates Client Delivery & Agency Operations',
    category: 'Consulting',
    tags: 'AI, consulting, automation, workflows',
    excerpt: 'Learn how technology consulting agencies integrate AI workflows to automate reporting, audit software vendors, and accelerate project delivery.',
    content: `
      <p>Artificial Intelligence is transforming how modern technology consulting agencies serve clients. By leveraging automated workflows, teams eliminate repetitive administrative tasks and focus entirely on high-value strategy.</p>

      <h2>Streamlining Client Deliverables</h2>
      <p>Integrating AI into project management enables rapid reporting, instant document generation, and continuous audit trails for client engagements.</p>
    `,
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
    status: 'published',
    read_time: '6 min read',
    meta_description: 'Learn how technology consulting agencies integrate AI workflows to automate reporting and accelerate project delivery.',
    keywords: 'AI automation agency, technology consulting agency, business automation'
  }
};

// Category → accent color mapping
const CATEGORY_COLORS = {
  'Business Templates':              '#22d3ee',
  'Business Systems & Productivity': '#fb923c',
  'Consulting':                      '#a78bfa',
  'AI & Automation':                 '#f472b6',
  'Finance & Tax':                   '#34d399',
};
function getCatColor(cat) {
  return CATEGORY_COLORS[cat] || '#38bdf8';
}

// Reading Progress Bar
function ReadingProgressBar() {
  useEffect(() => {
    const bar = document.getElementById('reading-progress-bar');
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div id="reading-progress-bar" />;
}

// Social Share Bar
function ShareBar({ title, slug }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.optivoic.com/blog/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 border-y border-white/8">
      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mr-1">Share:</span>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="share-btn">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.734l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
        </svg>
        Post on X
      </a>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="share-btn">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
      <button onClick={handleCopy} className={`share-btn ${copied ? 'copied' : ''}`}>
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            Copy Link
          </>
        )}
      </button>
    </div>
  );
}

// Related Articles mini-cards
function RelatedArticles({ currentSlug, currentCategory }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const { data } = await supabase
          .from('blog_posts')
          .select('id, slug, title, category, excerpt, read_time, created_at, featured_image')
          .eq('status', 'published')
          .eq('category', currentCategory)
          .neq('slug', currentSlug)
          .limit(3);

        if (data && data.length > 0) {
          setRelated(data);
        } else {
          // Fallback: seed posts from same category, exclude current
          const seeds = Object.values(SEED_POSTS_MAP).filter(
            p => p.category === currentCategory && p.slug !== currentSlug
          );
          setRelated(seeds.slice(0, 3));
        }
      } catch {
        const seeds = Object.values(SEED_POSTS_MAP).filter(
          p => p.category === currentCategory && p.slug !== currentSlug
        );
        setRelated(seeds.slice(0, 3));
      }
    };
    if (currentCategory) loadRelated();
  }, [currentSlug, currentCategory]);

  if (!related.length) return null;

  const accentColor = getCatColor(currentCategory);

  return (
    <div className="mt-16 pt-10 border-t border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 rounded-full" style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />
        <h3 className="text-lg font-black text-white uppercase tracking-wider">More in {currentCategory}</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 hover:bg-white/[0.05] transition-all"
          >
            {post.featured_image && (
              <div className="w-full h-28 rounded-xl overflow-hidden mb-3">
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            )}
            <p className="text-xs font-semibold mb-1" style={{ color: accentColor }}>{post.read_time || '5 min read'}</p>
            <h4 className="text-sm font-bold text-white group-hover:text-gray-200 leading-snug line-clamp-2">{post.title}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Automatically injects the Google Reader Revenue Manager (RRM) Inline CTA div
 * into the article body after the second paragraph if not already present.
 */
function injectInlineCTA(contentStr) {
  if (!contentStr) return '';
  if (contentStr.includes('rrm-inline-cta')) {
    return contentStr; // Respect manually placed snippet
  }

  const ctaSnippet = '<div rrm-inline-cta="8417e44e-8aab-4f00-85d7-bff3973fe391" class="my-8"></div>';

  let pCount = 0;
  const injected = contentStr.replace(/<\/p>/gi, (match) => {
    pCount++;
    if (pCount === 2) {
      return match + '\n' + ctaSnippet + '\n';
    }
    return match;
  });

  if (pCount >= 2) {
    return injected;
  }

  // Fallback if fewer than 2 paragraphs exist
  return contentStr + '\n' + ctaSnippet;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        await fetchBookmarks();
        const { data } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (data) {
          setPost(data);
          setSaved(isBookmarked(data.slug));
        } else if (SEED_POSTS_MAP[slug]) {
          setPost(SEED_POSTS_MAP[slug]);
          setSaved(isBookmarked(SEED_POSTS_MAP[slug].slug));
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        if (SEED_POSTS_MAP[slug]) {
          setPost(SEED_POSTS_MAP[slug]);
          setSaved(isBookmarked(SEED_POSTS_MAP[slug].slug));
        }
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  const handleBookmarkToggle = async () => {
    if (!post) return;
    const result = await toggleBookmark(post);
    if (result.requiresAuth) {
      setAuthModalOpen(true);
      return;
    }
    if (result.success) {
      setSaved(result.saved);
      setToastMessage(result.saved
        ? '⭐ Article saved to your Knowledge Vault!'
        : 'Article removed from Knowledge Vault.');
      setTimeout(() => setToastMessage(''), 3500);
    }
  };

  // After successful login, complete the pending save
  useEffect(() => {
    if (!authModalOpen) return;
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && post && session) {
        const result = await toggleBookmark(post);
        if (result.success) {
          setSaved(result.saved);
          setToastMessage(result.saved ? '⭐ Article saved to your Knowledge Vault!' : 'Article removed.');
          setTimeout(() => setToastMessage(''), 3500);
        }
        setAuthModalOpen(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [authModalOpen, post]);

  usePageMeta({
    title: `${post?.title || 'Article'} | Optivoic Insights`,
    description: post?.meta_description || post?.excerpt || 'Read our latest article on technology consulting and business frameworks.',
    keywords: post?.keywords || post?.tags || 'technology consulting agency, AI automation agency, reseller templates, business frameworks',
    canonical: `https://www.optivoic.com/blog/${slug}`,
    robots: 'index, follow',
    jsonLd: post ? {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: post.title,
      description: post.meta_description || post.excerpt,
      image: post.featured_image ? [post.featured_image] : undefined,
      datePublished: post.created_at,
      dateModified: post.updated_at || post.created_at,
      author: { '@type': 'Organization', name: 'Optivoic Editorial', url: 'https://www.optivoic.com' },
      publisher: {
        '@type': 'Organization',
        name: 'Optivoic',
        url: 'https://www.optivoic.com',
        logo: { '@type': 'ImageObject', url: 'https://www.optivoic.com/assets/og-image.jpg' }
      },
      isPartOf: {
        '@type': ['CreativeWork', 'Product'],
        name: 'Optivoic News',
        productID: 'CAow2p_hCw:openaccess'
      },
      mainEntityOfPage: `https://www.optivoic.com/blog/${slug}`
    } : null
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center px-8 text-center">
        <div className="text-6xl mb-6">📄</div>
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-400 mb-6">The article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all">
          ← Return to Blog
        </Link>
      </div>
    );
  }

  const rawTags = post.tags || post.keywords || '';
  const accentColor = getCatColor(post.category);

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      {/* Reading progress bar */}
      <ReadingProgressBar />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold px-6 py-3 rounded-2xl shadow-[0_0_25px_rgba(56,182,255,0.5)] flex items-center gap-2 text-sm animate-pulse">
          {toastMessage}
        </div>
      )}

      {/* ── Cinematic Article Header ─────────────────────────────────── */}
      {post.featured_image ? (
        /* Full-bleed image hero */
        <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.image_alt || post.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Floating header content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 max-w-5xl mx-auto w-full">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Link to="/blog" className="text-xs font-bold text-white/60 hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors">
                ← All Articles
              </Link>
              <span className="text-white/20">|</span>
              <span
                className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}50`, color: accentColor }}
              >
                {post.category || 'Article'}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05] mb-4 drop-shadow-2xl max-w-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="font-semibold text-white/80">Optivoic Editorial Team</span>
              <span>•</span>
              <span>{new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              {post.read_time && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {post.read_time}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Gradient orb hero for posts without an image */
        <div className="relative w-full py-24 overflow-hidden" style={{ background: '#020202' }}>
          {/* Orb decorations */}
          <div className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full opacity-15 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Decorative category BG text */}
          <span className="absolute inset-0 flex items-center justify-center text-[160px] md:text-[220px] font-black uppercase tracking-tighter text-white opacity-[0.022] select-none pointer-events-none overflow-hidden">
            {(post.category || 'BLOG').split(' ')[0]}
          </span>

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Link to="/blog" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors">
                ← All Articles
              </Link>
              <span className="text-white/10">|</span>
              <span
                className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}50`, color: accentColor }}
              >
                {post.category || 'Article'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.05] mb-6 max-w-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="font-semibold text-gray-300">Optivoic Editorial Team</span>
              <span>•</span>
              <span>{new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              {post.read_time && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {post.read_time}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Article Body ─────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto px-6 md:px-8 py-10">

        {/* Actions row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-1.5">
            {rawTags && rawTags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
              <span key={tag} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10" style={{ color: accentColor }}>
                #{tag}
              </span>
            ))}
          </div>
          <button
            onClick={handleBookmarkToggle}
            className={`text-xs font-bold px-4 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${saved ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-white/5 border-white/15 text-gray-300 hover:bg-white/10 hover:text-white'}`}
            title={saved ? 'Saved in Knowledge Vault' : 'Bookmark this article to your Knowledge Vault'}
          >
            {saved ? '⭐ Saved in Vault' : '☆ Save to Vault'}
          </button>
        </div>

        {/* Share bar */}
        <ShareBar title={post.title} slug={post.slug} />

        {/* Excerpt lead box */}
        {post.excerpt && (
          <div
            className="my-8 p-6 rounded-2xl text-gray-300 text-lg leading-relaxed italic"
            style={{
              background: `${accentColor}08`,
              border: `1px solid ${accentColor}25`,
              boxShadow: `0 0 30px ${accentColor}08`
            }}
          >
            {post.excerpt}
          </div>
        )}

        {/* HTML Article Body */}
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: injectInlineCTA(post.content) }} />

        {/* Bottom tags */}
        {rawTags && (
          <div className="mt-12 flex flex-wrap items-center gap-2 pt-6 border-t border-white/10">
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mr-2">Tags:</span>
            {rawTags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
              <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10" style={{ color: accentColor }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share bar (bottom) */}
        <div className="mt-8">
          <ShareBar title={post.title} slug={post.slug} />
        </div>

        {/* Google AdSense Banner */}
        <div className="my-10">
          <AdSenseBanner className="text-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4" />
        </div>

        {/* Related Articles */}
        <RelatedArticles currentSlug={post.slug} currentCategory={post.category} />

        {/* CTA Footer — premium glow treatment */}
        <div className="mt-16 relative rounded-3xl overflow-hidden p-8 md:p-10">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-[#0a0a14] to-violet-900/20" />
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-3xl" style={{
            padding: '1px',
            background: `linear-gradient(135deg, ${accentColor}50, #818cf850, #a78bfa50)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }} />
          <div className="absolute top-0 left-1/3 w-48 h-48 rounded-full opacity-15 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, filter: 'blur(40px)' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white mb-1">Ready to optimize your operations?</h3>
              <p className="text-sm text-gray-400">Explore production-grade templates and software systems in our digital marketplace.</p>
            </div>
            <Link
              to="/marketplace#digital-marketplace"
              className="flex-shrink-0 px-7 py-3 rounded-full font-bold text-black text-sm transition-all hover:scale-105 whitespace-nowrap"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #818cf8)`, boxShadow: `0 0 25px ${accentColor}40` }}
            >
              Browse Marketplace →
            </Link>
          </div>
        </div>

      </article>

      {/* Auth Modal — shown when a guest clicks "Save to Vault" */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        redirectTo={`/blog/${slug}`}
        subtitle="Save articles to your personal Knowledge Vault — accessible from any device."
      />

    </div>
  );
}
