import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

export default function SitemapPage() {
  usePageMeta({
    title: 'Sitemap | Optivoic Navigation Directory',
    description: 'Explore the full sitemap of Optivoic including our digital marketplace, business templates, consulting services, blog insights, and documentation.',
    keywords: 'sitemap, optivoic site directory, reseller command center, technology consulting, business templates',
    canonical: 'https://www.optivoic.com/sitemap',
    robots: 'index, follow'
  });

  const siteStructure = [
    {
      category: 'Core Pages',
      icon: '🌐',
      links: [
        { title: 'Homepage', path: '/', desc: 'AI-powered technology consulting agency & digital marketplace.' },
        { title: 'Digital Marketplace', path: '/marketplace', desc: 'Browse business workspaces, automated trackers, and enterprise frameworks.' },
        { title: 'Technology Consulting', path: '/consulting', desc: 'Bespoke AI automation, custom software, and technology consulting.' },
        { title: 'Blog & Insights', path: '/blog', desc: 'Production-tested operational guides, AI blueprints, and agency growth tips.' },
        { title: 'Frequently Asked Questions', path: '/faq', desc: 'Common questions regarding templates, licensing, and implementation.' },
      ]
    },
    {
      category: 'Templates & Products',
      icon: '📦',
      links: [
        { title: 'Reseller Command Center', path: '/reseller-command-center', desc: 'Turnkey operational framework for managing inventory, tracking profits, and scaling sales.' },
        { title: 'Executive Tax Engine', path: '/tax-engine', desc: 'Automated 1099 tax estimation, deduction tracking, and quarterly liquidity allocation.' },
      ]
    },
    {
      category: 'Portals & Account',
      icon: '🔐',
      links: [
        { title: 'OptiVoic Portal', path: '/portal', desc: 'Access your purchased templates, downloads, saved strategy guides, and custom consulting deliverables.' },
        { title: 'Root Admin Command Center', path: '/admin', desc: 'Administrative dashboard for client management and asset deployment.' },
        { title: 'Blog Editorial Suite', path: '/blog-admin', desc: 'Manage articles, draft posts, and upload HTML blog files.' },
      ]
    },
    {
      category: 'Legal & Technical',
      icon: '📜',
      links: [
        { title: 'Terms of Service', path: '/terms', desc: 'Terms governing marketplace purchases, licensing, and consulting services.' },
        { title: 'Privacy Policy', path: '/privacy', desc: 'How Optivoic collects, protects, and uses customer data.' },
        { title: 'XML Sitemap (Search Engines)', path: '/sitemap.xml', external: true, desc: 'Machine-readable XML sitemap for search engine web crawlers.' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white">
      <div className="max-w-6xl mx-auto px-8 py-24">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Optivoic Navigation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Site Directory & Sitemap</h1>
          <p className="text-gray-400 text-lg max-w-2xl">Find any page, template, resource, or portal across the Optivoic ecosystem.</p>
        </div>

        {/* Directory Grid */}
        <div className="grid gap-12 md:grid-cols-2">
          {siteStructure.map((group) => (
            <div key={group.category} className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="text-3xl">{group.icon}</span>
                <h2 className="text-2xl font-bold text-white">{group.category}</h2>
              </div>

              <div className="space-y-4">
                {group.links.map((link) => (
                  <div key={link.path} className="group p-4 rounded-2xl border border-white/5 bg-black/40 hover:border-cyan-500/30 hover:bg-black/60 transition-all">
                    {link.external ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className="block">
                        <h3 className="font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center justify-between text-base">
                          <span>{link.title}</span>
                          <span className="text-xs opacity-70">↗</span>
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{link.desc}</p>
                      </a>
                    ) : (
                      <Link to={link.path} className="block">
                        <h3 className="font-bold text-white group-hover:text-cyan-300 flex items-center justify-between text-base">
                          <span>{link.title}</span>
                          <span className="text-xs text-gray-500 group-hover:text-cyan-300 transition-colors">→</span>
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{link.desc}</p>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
