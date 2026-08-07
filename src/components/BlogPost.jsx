import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { supabase } from '../supabaseClient';

const SEED_POSTS_MAP = {
  'scaling-reseller-operations-with-automated-frameworks': {
    id: 'seed-1',
    slug: 'scaling-reseller-operations-with-automated-frameworks',
    title: 'Scaling Reseller Operations with Turnkey Automated Frameworks',
    category: 'Reseller Systems',
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
    meta_description: 'Discover how top-performing reselling enterprises track inventory and calculate profit margins automatically with Optivoic frameworks.',
    keywords: 'reseller templates, inventory tracking, business frameworks, reselling software',
    featured_image: 'https://wekjabmdztgkhfszgyeg.supabase.co/storage/v1/object/public/general/gemini-reseller-collage.png'
  },
  '1099-executive-tax-estimation-strategies': {
    id: 'seed-2',
    slug: '1099-executive-tax-estimation-strategies',
    title: '1099 Executive Tax Allocation: Quarter-by-Quarter Blueprint',
    category: 'Tax Systems',
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
    meta_description: 'A practical framework for freelancers and agency founders to estimate quarterly taxes and track deductions.',
    keywords: '1099 tax estimation, contractor tax template, business financial planning'
  },
  'ai-automation-for-modern-consulting-agencies': {
    id: 'seed-3',
    slug: 'ai-automation-for-modern-consulting-agencies',
    title: 'How AI Automation Elevates Client Delivery & Agency Operations',
    category: 'AI Automation',
    excerpt: 'Learn how technology consulting agencies integrate AI workflows to automate reporting, audit software vendors, and accelerate project delivery.',
    content: `
      <p>Artificial Intelligence is transforming how modern technology consulting agencies serve clients. By leveraging automated workflows, teams eliminate repetitive administrative tasks and focus entirely on high-value strategy.</p>

      <h2>Streamlining Client Deliverables</h2>
      <p>Integrating AI into project management enables rapid reporting, instant document generation, and continuous audit trails for client engagements.</p>
    `,
    created_at: new Date(Date.now() - 86400000 * 9).toISOString(),
    status: 'published',
    meta_description: 'Learn how technology consulting agencies integrate AI workflows to automate reporting and accelerate project delivery.',
    keywords: 'AI automation agency, technology consulting agency, business automation'
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const { data } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (data) {
          setPost(data);
        } else if (SEED_POSTS_MAP[slug]) {
          setPost(SEED_POSTS_MAP[slug]);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        if (SEED_POSTS_MAP[slug]) setPost(SEED_POSTS_MAP[slug]);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  usePageMeta({
    title: `${post?.title || 'Article'} | Optivoic Insights`,
    description: post?.meta_description || post?.excerpt || 'Read our latest article on technology consulting and business frameworks.',
    keywords: post?.keywords || 'technology consulting agency, AI automation agency, reseller templates, business frameworks',
    canonical: `https://www.optivoic.com/blog/${slug}`,
    robots: 'index, follow',
    jsonLd: post ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.meta_description || post.excerpt,
      author: {
        '@type': 'Organization',
        name: 'Optivoic Editorial'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Optivoic'
      },
      mainEntityOfPage: `https://www.optivoic.com/blog/${slug}`
    } : null
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-400 mb-6">The article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all">
          ← Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <article className="max-w-4xl mx-auto px-6 md:px-8 py-20">
        
        {/* Navigation & Category */}
        <div className="mb-8 flex items-center justify-between">
          <Link to="/blog" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1">
            ← Back to All Articles
          </Link>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
            {post.category || 'Article'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight text-white">
          {post.title}
        </h1>

        {/* Article Meta Header */}
        <div className="flex items-center gap-4 py-4 border-y border-white/10 mb-8 text-xs text-gray-400">
          <span className="font-semibold text-white">By Optivoic Editorial Team</span>
          <span>•</span>
          <span>{new Date(post.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={post.featured_image} alt={post.image_alt || post.title} className="w-full max-h-[450px] object-cover" />
          </div>
        )}

        {/* Excerpt Lead */}
        {post.excerpt && (
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-gray-300 text-lg leading-relaxed italic mb-10">
            {post.excerpt}
          </div>
        )}

        {/* HTML Article Body */}
        <div 
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer & Call to Action */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Ready to optimize your operations?</h3>
            <p className="text-sm text-gray-400">Explore production-grade templates and software systems in our digital marketplace.</p>
          </div>
          <Link to="/marketplace" className="px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all whitespace-nowrap">
            Browse Marketplace →
          </Link>
        </div>

      </article>
    </div>
  );
}
