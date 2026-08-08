import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://wekjabmdztgkhfszgyeg.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla2phYm1kenRna2hmc3pneWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyNzEyMzcsImV4cCI6MjA5ODg0NzIzN30.Evp2NYld38fAfTr3RPemDmBcLPC06o7OwgzWEEOH6ss';

const SITE_URL = 'https://www.optivoic.com';

async function buildSitemaps() {
  console.log('Generating dynamic blog sitemap from Supabase...');
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at, status')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Sitemap build warning:', error.message);
    }

    const published = (posts || []).filter(p => p && (p.status === 'published' || !p.status));

    let latestDate = new Date().toISOString().split('T')[0];
    if (published.length > 0) {
      const dates = published.map(p => new Date(p.updated_at || p.created_at || Date.now()).getTime());
      const maxTime = Math.max(...dates.filter(t => !isNaN(t)));
      if (!isNaN(maxTime) && maxTime > 0) {
        latestDate = new Date(maxTime).toISOString().split('T')[0];
      }
    }

    const xmlEntries = published.map(post => {
      const lastMod = new Date(post.updated_at || post.created_at || Date.now()).toISOString().split('T')[0];
      const cleanSlug = post.slug ? post.slug.trim().replace(/^\/+|\/+$/g, '') : '';
      const loc = `${SITE_URL}/blog/${cleanSlug}`;

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>`;
    }).join('\n');

    const sitemapBlogXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog Main Index -->
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${latestDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
<!-- Published Blog Articles (${published.length}) -->
${xmlEntries}
</urlset>
`;

    const targetPath = path.join(process.cwd(), 'public', 'sitemap-blog.xml');
    fs.writeFileSync(targetPath, sitemapBlogXml, 'utf8');
    console.log(`Successfully generated public/sitemap-blog.xml with ${published.length} published article(s)!`);

  } catch (err) {
    console.error('Failed to generate dynamic blog sitemap:', err);
  }
}

buildSitemaps();
