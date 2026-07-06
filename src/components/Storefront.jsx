import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import SpaceBackground from './SpaceBackground';
import { usePageMeta } from '../utils/usePageMeta';
import Footer from './Footer';

// IMPORTANT: Ensure this path matches your global Tailwind CSS file!
// If your css is in the src folder, it might be import '../index.css' or import './index.css'
// import '../index.css'; 

// ==========================================
// 1. DATA STORE (moved to ServiceGrid)
// ==========================================
// Templates data is now in ServiceGrid.jsx for centralized management

// ==========================================
// 2. MODULAR COMPONENTS
// ==========================================

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
      <Link to="/marketplace" className="hover:text-white transition-all">Marketplace</Link>
      <Link to="/consulting" className="hover:text-white transition-all">Consulting</Link>
      <Link to="/blog" className="hover:text-white transition-all">Blog</Link>
      <Link to="/faq" className="hover:text-white transition-all">FAQ</Link>
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

const Hero = () => (
  <section className="relative pt-48 pb-32 px-8 flex flex-col items-center text-center z-10 border-b border-white/5">
    <div className="inline-flex items-center mb-8 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 backdrop-blur-xl">
      <span className="text-xs font-bold tracking-widest uppercase text-cyan-300 flex items-center">
        <span className="w-2.5 h-2.5 inline-block rounded-full bg-cyan-400 mr-3 animate-pulse"></span>
        Technology Consulting • AI Automation • Business Templates
      </span>
    </div>

    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] max-w-6xl">
      The Top Marketplace for <br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Business Operating Systems.</span>
    </h1>
    
    <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-4xl font-light leading-relaxed">
      Explore ready-to-use templates for AI automation, e-commerce, and finance, or hire our technology consulting agency to build custom-engineered solutions.
    </p>

    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {['Technology Consulting Agency','AI Automation','Reseller Templates','Business Frameworks','E-Commerce Systems','Workflow Automation'].map((item) => (
        <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
          {item}
        </span>
      ))}
    </div>
    
    <div className="flex flex-col sm:flex-row gap-6">
      <Link to="/marketplace" className="bg-white text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all">
        Explore the Marketplace
      </Link>
      <Link to="/consulting" className="bg-white/[0.05] border border-white/20 backdrop-blur-xl text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-white/10 transition-all">
        Book a Strategy Call
      </Link>
    </div>
  </section>
);

const BentoServices = () => (
  <section className="py-32 px-8 max-w-7xl mx-auto z-10 relative">
    <div className="mb-16 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">Agency Capabilities</h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">Targeted expertise to remove operational bottlenecks and engineer velocity.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
      {/* AI Evaluation */}
      <div className="md:col-span-2 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-violet-500/50 hover:shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-violet-500/10 blur-[80px] rounded-full group-hover:bg-violet-500/20 transition-all duration-500"></div>
        <div className="relative z-10">
          <div className="w-14 h-14 mb-6 bg-violet-500/10 border border-violet-500/20 rounded-xl flex items-center justify-center text-violet-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md">AI Evaluation & Prompt Engineering</h3>
          <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
            Rigorous human evaluation for companies training AI models. We test prompts, grade responses, and provide actionable feedback to refine your systems.
          </p>
        </div>
      </div>

      {/* Python Automation */}
      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 hover:bg-white/[0.04] hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full group-hover:bg-cyan-500/10 transition-all duration-500"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 mb-5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Custom Python Automation</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Single-purpose scripts designed to automate tedious workflows, data processing, and repetitive operational loops.
          </p>
        </div>
      </div>

      {/* Web & DB Fixes */}
      <div className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-8 hover:bg-white/[0.04] hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/5 blur-[60px] rounded-full group-hover:bg-cyan-500/10 transition-all duration-500"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 mb-5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 0116 0" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">Web & Database Fixes</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            Isolated bug fixes and architecture assistance for Next.js and React. Rapid backend database configuration via Supabase.
          </p>
        </div>
      </div>

      {/* E-Commerce */}
      <div className="md:col-span-2 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-10 hover:bg-white/[0.04] hover:border-blue-500/50 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500"></div>
        <div className="relative z-10">
          <div className="w-14 h-14 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-md">E-Commerce Market Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-cyan-400 font-bold mb-2">SEO Copywriting</h4>
            <p className="text-gray-300 text-sm leading-relaxed">Highly descriptive, search-optimized product titles for platforms like eBay and Depop. Specializing in luxury and vintage.</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-bold mb-2">Valuation & Research</h4>
            <p className="text-gray-300 text-sm leading-relaxed">Leverage deep analytical skills to evaluate market trends and determine optimal pricing for collectibles and luxury goods.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SEOCopySection = () => (
  <section className="py-24 px-8 max-w-7xl mx-auto z-10 relative">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
        Scaling Digital Infrastructure
      </h2>
      <p className="text-xl text-gray-400 max-w-3xl mx-auto">
        In the landscape of 2026, technology consulting is about <strong>engineering velocity</strong>. 
        We bridge the gap between complex architecture and profitable operations.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      
      {/* Card 1 with Custom Saved Image */}
      <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:border-cyan-500/50 transition-colors group flex flex-col">
        <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden bg-black/50 border border-white/5 relative">
          <img 
            src="/assets/image1.png" 
            alt="AI Evaluation and Prompt Engineering Services" 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">AI & Prompt Engineering</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          The quality of your "AI workforce" depends on the rigor of your testing. We provide 
          <strong> human-in-the-loop evaluation</strong> for custom GPTs and agentic workflows, 
          ensuring your systems are accurate, safe, and enterprise-ready.
        </p>
      </div>

      {/* Card 2 with Custom Saved Image */}
      <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:border-violet-500/50 transition-colors group flex flex-col">
        <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden bg-black/50 border border-white/5 relative">
          <img 
            src="/assets/image2.png" 
            alt="E-Commerce Market Strategy and Inventory Management" 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">E-Commerce Market Strategy</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          Data is the lifeblood of retail. Our <strong>inventory management templates and COGS trackers</strong> help high-volume resellers on eBay, Depop, and Shopify maximize 
          margins through <strong>SEO-optimized copywriting</strong> and valuation models.
        </p>
      </div>

      {/* Card 3 with Custom Saved Image */}
      <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:border-blue-500/50 transition-colors group flex flex-col">
        <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden bg-black/50 border border-white/5 relative">
          <img 
            src="/assets/image3.png" 
            alt="Expert Designed Templates and Frameworks" 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Expert-Designed Templates</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          We bridge the gap between complex software and everyday usability. By providing <strong>expert-designed templates 
        and scalable digital workspaces</strong>, we build "business-in-a-box" systems tailored for consumers, freelancers, and entrepreneurs.
        </p>
      </div>

    </div>

  </section>
);

const MarketplaceOverviewSection = () => (
  <section className="py-24 px-8 max-w-7xl mx-auto z-10 relative border-t border-white/5">
    <div className="bg-gradient-to-br from-white/[0.05] to-black/40 border border-white/10 rounded-[40px] p-10 md:p-16 backdrop-blur-md overflow-hidden relative">
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Optivoic Marketplace
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
            Why Optivoic for Digital Transformation?
          </h3>
          <p className="text-lg text-gray-400 leading-relaxed mb-6">
            The marketplace is where we package our most practical systems into easy-to-use templates and workflows. Whether you are running a reseller business, managing client projects, or organizing your finances, each package is designed to turn complex operations into a repeatable daily routine.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            From profit trackers to professional hubs, every product is built to help you move faster, stay organized, and make better decisions without the overwhelm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/marketplace" className="bg-white text-black text-center font-bold py-4 px-8 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1">
              Explore the Marketplace
            </Link>
            <Link to="/reseller-command-center" className="bg-white/5 border border-white/20 text-white text-center font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              See the Reseller Package
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/blog" className="text-sm text-cyan-300 hover:text-cyan-200 underline underline-offset-4">Read the Blog</Link>
            <Link to="/faq" className="text-sm text-cyan-300 hover:text-cyan-200 underline underline-offset-4">Browse the FAQ</Link>
          </div>
        </div>

        <div className="bg-black/35 border border-white/10 rounded-3xl p-8 space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300 mb-3">What you get</p>
            <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
              <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400"></span><span>Turnkey templates for revenue, ops, and workflow clarity.</span></li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400"></span><span>Simple systems that save time and support daily execution.</span></li>
              <li className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400"></span><span>Practical tools designed to raise efficiency and protect margins.</span></li>
            </ul>
          </div>
          <div className="border-t border-white/10 pt-5">
            <p className="text-sm italic text-gray-400 leading-relaxed">
              “The right system doesn’t just organize work. It makes growth feel manageable.”
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SEOClosingSection = () => (
  <section className="py-24 px-8 max-w-7xl mx-auto z-10 relative border-t border-white/5">
    <div className="bg-gradient-to-br from-white/[0.04] to-black/40 border border-white/10 rounded-[40px] p-10 md:p-16 backdrop-blur-md overflow-hidden relative">
      
      {/* Background Glows for visual depth */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: The Hook & Primary CTA */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
            Stop Managing Tools. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Start Scaling Your Vision.</span>
          </h2>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-lg">
            Building a sustainable venture requires precision-engineered systems. Reclaim your cognitive bandwidth and let a reliable ecosystem drive your business forward.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/marketplace" className="bg-white text-black text-center font-bold py-4 px-8 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1">
              Explore Systems
            </Link>
            <Link to="/consulting" className="bg-white/5 border border-white/20 text-white text-center font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              Hire the Agency
            </Link>
          </div>
        </div>

        {/* Right Side: Structured Value Pillars (SEO Keywords) */}
        <div className="space-y-6">
          
          {/* Pillar 1 */}
          <div className="flex gap-5 items-start bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all duration-300">
            <div className="mt-1 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">For Creators & Retailers</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Organize your pipeline with <strong>expert-designed Notion templates</strong> and scale operations using robust <strong>e-commerce inventory management solutions</strong>.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex gap-5 items-start bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-violet-500/30 hover:bg-white/[0.02] transition-all duration-300">
            <div className="mt-1 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">For Growing Enterprises</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Eliminate operational friction with <strong>scalable digital workspaces for entrepreneurs</strong>. We optimize your backend with expert <strong>Next.js and React database architecture</strong>.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex gap-5 items-start bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-blue-500/30 hover:bg-white/[0.02] transition-all duration-300">
            <div className="mt-1 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-2">For 1099 Professionals</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Adopt comprehensive <strong>business-in-a-box systems</strong>. Implement reliable <strong>freelance tax allocation strategies</strong> and leverage top-tier <strong>technology consulting for growing enterprises</strong>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// 3. MAIN EXPORT
// ==========================================
export default function Storefront() {
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

  usePageMeta({
    title: 'Optivoic | Technology Consulting Agency for AI Automation & Business Templates',
    description: 'Optivoic is a technology consulting agency for AI automation, custom web systems, reseller templates, and business frameworks that help teams grow faster.',
    keywords: 'technology consulting agency, AI automation agency, business templates, reseller templates, custom web development, workflow automation, e-commerce systems',
    canonical: 'https://www.optivoic.com/',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogTitle: 'Optivoic | Technology Consulting Agency for AI Automation & Business Templates',
    ogDescription: 'Professional-grade operational frameworks, AI automation, and digital systems built to scale revenue and simplify daily execution.',
    ogType: 'website',
    ogUrl: 'https://www.optivoic.com/'
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      <AmbientBackground />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <Hero />
      <MarketplaceOverviewSection />
      <BentoServices />
      <SEOCopySection /> 
      <SEOClosingSection />
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Footer />
    </div>
  );
}