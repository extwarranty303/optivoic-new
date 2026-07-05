import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from './Footer';
import { usePageMeta } from '../utils/usePageMeta';
import { supabase } from '../supabaseClient';

const fallbackPosts = {
  'technology-consulting-agency-what-the-best-firms-do-differently': {
    title: 'Technology Consulting Agency: What the Best Firms Do Differently',
    description: 'A practical look at how top technology consulting agencies create value with strategy, implementation, and systems thinking.',
    content: 'The best technology consulting agencies don’t just recommend tools—they simplify operations, connect strategy to execution, and build systems that create measurable momentum. For founders and operators, the difference is often in clarity, delivery, and the ability to turn complexity into a repeatable process.'
  },
  'ai-automation-agency-services-that-actually-improve-operations': {
    title: 'AI Automation Agency Services That Actually Improve Operations',
    description: 'How AI automation agencies create real ROI by solving difficult workflow problems and reducing repetitive manual effort.',
    content: 'Real AI automation work starts with identifying the bottlenecks that cost you time and margin. The strongest agencies focus on practical automation that improves daily operations instead of chasing flashy tools that add complexity.'
  },
  'why-reseller-templates-and-business-frameworks-matter': {
    title: 'Why Reseller Templates and Business Frameworks Matter for Modern Teams',
    description: 'Why packaged business frameworks are helping modern resellers, consultants, and service businesses operate with more focus and less friction.',
    content: 'Reseller templates and business frameworks matter because they standardize the work that would otherwise remain scattered across notes, spreadsheets, and memory. When the system is clear, execution becomes easier and growth becomes more predictable.'
  }
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (data) {
        setPost(data);
      } else {
        setPost(fallbackPosts[slug] || null);
      }
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  usePageMeta({
    title: `${post?.title || 'Blog Post'} | Optivoic`,
    description: post?.meta_description || post?.description || 'Read our latest article.',
    keywords: post?.keywords || 'technology consulting agency, AI automation agency, reseller templates, business frameworks',
    canonical: `https://www.optivoic.com/blog/${slug}`,
    robots: 'index, follow',
    jsonLd: post ? {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.meta_description || post.description || post.excerpt,
      author: {
        '@type': 'Organization',
        name: 'Optivoic'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Optivoic',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.optivoic.com/assets/optivoic-logo.png'
        }
      },
      mainEntityOfPage: `https://www.optivoic.com/blog/${slug}`,
      keywords: post.keywords || 'technology consulting agency, AI automation agency, reseller templates, business frameworks'
    } : null
  });

  if (loading) {
    return <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">Loading article…</div>;
  }

  if (!post) {
    return <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center">Post not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <div className="max-w-4xl mx-auto px-8 py-24">
        <Link to="/blog" className="text-cyan-400 hover:underline mb-8 inline-block">← Back to blog</Link>
        <h1 className="text-4xl md:text-5xl font-black mb-6">{post.title}</h1>
        <p className="text-lg text-gray-400 leading-relaxed whitespace-pre-line">{post.content || post.excerpt}</p>
      </div>
      <Footer />
    </div>
  );
}
