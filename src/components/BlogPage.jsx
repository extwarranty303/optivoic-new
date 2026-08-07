import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { supabase } from '../supabaseClient';

const SEED_POSTS = [
  {
    id: 'seed-1',
    slug: 'scaling-reseller-operations-with-automated-frameworks',
    title: 'Scaling Reseller Operations with Turnkey Automated Frameworks',
    category: 'Reseller Systems',
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
    category: 'Tax Systems',
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
    category: 'AI Automation',
    excerpt: 'Learn how technology consulting agencies integrate AI workflows to automate reporting, audit software vendors, and accelerate project delivery.',
    content: '<h2>The Shift to AI-Powered Agency Workflows</h2><p>Artificial Intelligence is no longer optional for high-growth agencies. By codifying recurring workflows into smart templates and automated scripts, teams deliver higher ROI for clients in half the time.</p>',
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
    status: 'published',
    read_time: '6 min read'
  }
];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data, error } = await supabase
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
        console.error("Error loading blog posts:", err);
        setPosts(SEED_POSTS);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter(Boolean)))];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      
      {/* Hero Section */}
      <section className="relative py-20 px-8 max-w-6xl mx-auto border-b border-white/10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Optivoic Insights & Knowledge Hub</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
          Practical Content for <br className="hidden md:inline"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">
            Growth-Minded Teams
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl font-light leading-relaxed mb-8">
          Explore production-tested strategies, operational blueprints, AI automation frameworks, and deep-dives on scaling digital businesses.
        </p>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === cat ? 'bg-cyan-400 text-black shadow-[0_0_15px_rgba(56,182,255,0.4)]' : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        {loading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse">Loading articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-3xl">
            <p className="text-lg font-semibold text-gray-400 mb-2">No articles found</p>
            <p className="text-sm text-gray-600">Try adjusting your search query or selecting another category.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article 
                key={post.id || post.slug} 
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between h-full"
              >
                <div>
                  {post.featured_image && (
                    <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden border border-white/10 relative">
                      <img 
                        src={post.featured_image} 
                        alt={post.image_alt || post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                      {post.category || 'Article'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500 font-medium">Optivoic Editorial</span>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
