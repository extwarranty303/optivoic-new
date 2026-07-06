import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { usePageMeta } from '../utils/usePageMeta';
import { supabase } from '../supabaseClient';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setPosts(data);
      }
      setLoading(false);
    };

    loadPosts();
  }, []);

  usePageMeta({
    title: 'Blog | Optivoic Technology Consulting & AI Automation',
    description: 'Read practical articles about AI automation, technology consulting, reseller templates, and efficient business systems.',
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

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <div className="max-w-6xl mx-auto px-8 py-24">
        <div className="mb-12">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4">Optivoic Insights</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Practical content for growth-minded teams</h1>
          <p className="text-lg text-gray-400 max-w-3xl">Explore articles built around the keywords our audience is actively searching for: AI automation, technology consulting, reseller templates, and business systems.</p>
        </div>

        {loading ? <p className="text-gray-400">Loading articles…</p> : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
                <p className="text-sm text-cyan-300 uppercase tracking-[0.25em] mb-3">{post.category || 'Article'}</p>
                <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                <p className="text-gray-400 mb-6 leading-relaxed">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="text-cyan-400 font-semibold hover:underline">Read article →</Link>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
