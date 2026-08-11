import React from 'react';
import { usePageMeta } from '../utils/usePageMeta';

const ConsultingHero = () => (
    <section className="relative pt-48 pb-32 px-8 flex flex-col items-center text-center z-10 border-b border-white/5">
      <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] max-w-5xl">
        Technology Consulting <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Engineered Velocity.</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl font-light leading-relaxed">
        We partner with ambitious companies to design, build, and scale custom digital infrastructure. From AI evaluation to full-stack web systems, our focus is on removing bottlenecks and creating operational momentum.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <a href="https://cal.com/chill-dev" target="_blank" rel="noopener noreferrer" className="bg-white text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all">
          Book a Strategy Call
        </a>
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
      </div>
    </section>
);

export default function Consulting() {
    usePageMeta({
        title: 'Technology Consulting & AI Automation — Optivoic',
        description: 'Optivoic is a technology consulting agency offering AI model evaluation, custom Python automation workflows, enterprise web development, and strategy consulting.',
        keywords: 'technology consulting agency, AI automation agency, custom software development consulting, prompt engineering services, Python automation solutions, enterprise tech strategy',
        canonical: 'https://www.optivoic.com/consulting',
        robots: 'index, follow',
        ogTitle: 'Technology Consulting & AI Automation — Optivoic',
        ogDescription: 'Bespoke technology consulting, AI model evaluation, and enterprise software engineering.',
        ogType: 'website',
        ogUrl: 'https://www.optivoic.com/consulting'
    });

    return (
        <>
            <ConsultingHero />
            <BentoServices />
        </>
    );
}