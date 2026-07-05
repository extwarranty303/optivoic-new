import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import SpaceBackground from './SpaceBackground';
import { usePageMeta } from '../utils/usePageMeta';
import ServiceGrid from './ServiceGrid';
import Footer from './Footer';

const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
    <SpaceBackground /> 
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000 z-0"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen z-0"></div>
  </div>
);

const Navbar = ({ onOpenAuth }) => (
  <nav className="fixed w-full border-b border-white/10 py-4 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl z-50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
    <Link to="/" className="text-2xl font-black text-white tracking-tighter drop-shadow-lg hover:opacity-90 transition-opacity">
      OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
    </Link>
    <div className="hidden md:flex space-x-8 font-medium text-sm text-gray-300">
      <Link to="/marketplace" className="text-white hover:text-white transition-all">Marketplace</Link>
      <Link to="/consulting" className="hover:text-white transition-all">Consulting</Link>
      <Link to="/aiservice" className="hover:text-white transition-all">AI Websites</Link>
    </div>
    <button 
      onClick={onOpenAuth} 
      className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-md"
    >
      Client Login
    </button>
  </nav>
);

const MarketplaceHero = () => (
  <section className="relative pt-44 pb-16 px-8 flex flex-col items-center text-center z-10 border-b border-white/5 max-w-6xl mx-auto">
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
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Fallback to inject Tailwind specifically for the Canvas environment preview
  // This ensures CSS works here, but won't break your local Vite config
  useEffect(() => {
    if (!window.tailwind && !document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      {usePageMeta({
        title: 'Digital Marketplace | OptiVoic Frameworks & Templates',
        description: 'Browse professional-grade business workspaces, automated trackers, and personal productivity hubs designed to reclaim your time and structure your daily routines.',
        ogTitle: 'OptiVoic | Digital Marketplace',
        ogDescription: 'Codified business and personal frameworks built to optimize your life and career.',
        ogType: 'website',
        ogUrl: 'https://optivoic.com/marketplace'
      })}

      <AmbientBackground />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <MarketplaceHero />
      <div className="relative z-10 py-12">
        <ServiceGrid />
      </div>
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Footer />
    </div>
  );
}
