import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://wekjabmdztgkhfszgyeg.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2phYm1kenRna2hmc3pneWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNzEyMzcsImV4cCI6MjA5ODg0NzIzN30.Evp2NYld38fAfTr3RPemDmBcLPC06o7OwgzWEEOH6ss';

const SITE_URL = 'https://www.optivoic.com';

async function buildRssFeed() {
  console.log('Generating dynamic RSS 2.0 feed from Supabase...');
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('RSS build warning:', error.message);
    }

    const published = (posts || []).filter(p => p && (p.status === 'published' || !p.status));

    const rssItems = published.map(post => {
      const cleanSlug = post.slug ? post.slug.trim().replace(/^\/+|\/+$/g, '') : '';
      const link = `${SITE_URL}/blog/${cleanSlug}`;
      const pubDate = new Date(post.created_at || Date.now()).toUTCString();
      const description = (post.excerpt || post.meta_description || post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const title = (post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const category = post.category || 'Business Templates';

      return `    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>${category}</category>
    </item>`;
    }).join('\n');

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OptiVoic Business Insights &amp; Automation Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert guides, business templates, executive productivity strategies, and operational tax engine automation from OptiVoic.</description>
    <language>en-us</language>    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;

    const targetPath = path.join(process.cwd(), 'public', 'rss.xml');
    fs.writeFileSync(targetPath, rssXml, 'utf8');
    console.log(`Successfully generated public/rss.xml with ${published.length} item(s)!`);

  } catch (err) {
    console.error('Failed to generate RSS feed:', err);
  }
}

buildRssFeed();
