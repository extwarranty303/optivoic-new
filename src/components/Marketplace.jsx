import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import ServiceGrid from './ServiceGrid';

const MarketplaceHero = () => (
  <section className="relative pt-4 pb-16 px-8 flex flex-col items-center text-center border-b border-white/5 max-w-6xl mx-auto">
    <div className="inline-flex items-center mb-6 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-xl">
      <span className="text-xs font-bold tracking-widest uppercase text-cyan-300 flex items-center">
        <span className="w-2.5 h-2.5 inline-block rounded-full bg-violet-500 mr-3 animate-pulse"></span>
        Codified Systems & Frameworks
      </span>
    </div>

    <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[1.1] max-w-4xl">
      Optimize Your Work. <br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Streamline Your Life.</span>
    </h1>
    
    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl font-light leading-relaxed">
      Welcome to the OptiVoic Digital Marketplace. We engineer high-performance systems for modern life. Browse our curated collection of professional-grade business workspaces, automated trackers, and personal productivity hubs designed to reclaim your time and structure your daily routines.
    </p>

    <div className="w-full max-w-4xl mb-8 rounded-[28px] border border-cyan-500/20 bg-cyan-500/10 p-6 text-left backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Built for real-world value</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-gray-300">Ongoing support included</span>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4">
        Every package is designed to deliver substantial business value, with the template, a comprehensive PDF user guide and FAQ, and a slide presentation included so you can deploy with confidence and keep improving over time.
      </p>
      <p className="text-sm text-gray-400">
        Pricing reflects the depth of the system, the implementation support, and the long-term usefulness of each framework.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mt-4 text-left">
      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 rounded-2xl flex gap-4 hover:border-cyan-500/30 transition-all">
        <div className="text-3xl">💼</div>
        <div>
          <h3 className="font-bold text-white mb-1">Professional Excellence</h3>
          <p className="text-sm text-gray-400">Scale operations, automate tax estimations, audit software vendors, and manage client sprints with robust, production-grade enterprise tools.</p>
        </div>
      </div>
      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl p-6 rounded-2xl flex gap-4 hover:border-violet-500/30 transition-all">
        <div className="text-3xl">🏠</div>
        <div>
          <h3 className="font-bold text-white mb-1">Personal Velocity</h3>
          <p className="text-sm text-gray-400">Master your personal finances, track collectibles portfolios, organize degree syllabi, plan nomad routes, and outline creative fiction projects.</p>
        </div>
      </div>
    </div>
  </section>
);

export default function Marketplace() {
  // Fallback to inject Tailwind specifically for the Canvas environment preview
  // This ensures CSS works here, but won't break your local Vite config
  useEffect(() => {
    if (import.meta.env.DEV && !window.tailwind && !document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  usePageMeta({
    title: 'Optivoic Marketplace — Business & Reseller Templates',
    description: 'Browse professional-grade reseller templates, 1099 tax trackers, and business automation workspaces designed to reclaim your time and maximize profit.',
    keywords: 'reseller command center, reseller templates, digital marketplace, 1099 tax estimation template, business automation frameworks, Google Sheets command center',
    canonical: 'https://www.optivoic.com/marketplace',
    robots: 'index, follow',
    ogTitle: 'Optivoic Marketplace — Business & Reseller Templates',
    ogDescription: 'Browse professional-grade reseller templates, 1099 tax trackers, and business automation workspaces designed to reclaim your time and maximize profit.',
    ogType: 'website',
    ogUrl: 'https://www.optivoic.com/marketplace'
  });

  return (
    <>
      <MarketplaceHero />
      <div id="digital-marketplace" className="py-12 scroll-mt-24 relative">
        <div id="marketplace" className="absolute -top-24"></div>
        <div id="catalog" className="absolute -top-24"></div>
        <div id="templates" className="absolute -top-24"></div>
        <ServiceGrid />
      </div>
    </>
  );
}
