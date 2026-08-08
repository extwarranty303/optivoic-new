/**
 * Utility to generate, format, and download XML sitemaps for OptiVoic Blog.
 */

const SITE_URL = 'https://www.optivoic.com';

/**
 * Format a Date object or date string into YYYY-MM-DD string format
 */
const formatDate = (dateInput) => {
  if (!dateInput) return new Date().toISOString().split('T')[0];
  try {
    return new Date(dateInput).toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
};

/**
 * Generates valid XML sitemap string for published blog articles
 */
export const generateBlogSitemapXml = (posts = []) => {
  const published = (posts || []).filter(p => p && (p.status === 'published' || !p.status));

  // Find latest update date
  let latestDate = new Date().toISOString().split('T')[0];
  if (published.length > 0) {
    const dates = published.map(p => new Date(p.updated_at || p.created_at || Date.now()).getTime());
    const maxTime = Math.max(...dates.filter(t => !isNaN(t)));
    if (!isNaN(maxTime) && maxTime > 0) {
      latestDate = new Date(maxTime).toISOString().split('T')[0];
    }
  }

  const xmlEntries = published.map(post => {
    const lastMod = formatDate(post.updated_at || post.created_at);
    const cleanSlug = post.slug ? post.slug.trim().replace(/^\/+|\/+$/g, '') : '';
    const loc = `${SITE_URL}/blog/${cleanSlug}`;

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
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
</urlset>`;
};

/**
 * Triggers instant browser download of sitemap-blog.xml
 */
export const downloadBlogSitemap = (posts = [], filename = 'sitemap-blog.xml') => {
  const xmlContent = generateBlogSitemapXml(posts);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Copies the generated blog sitemap XML to clipboard
 */
export const copyBlogSitemapToClipboard = async (posts = []) => {
  const xmlContent = generateBlogSitemapXml(posts);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(xmlContent);
    return true;
  }
  return false;
};
