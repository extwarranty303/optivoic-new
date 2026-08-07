import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { motion } from 'framer-motion';
import SpaceBackground from './SpaceBackground';
import { usePageMeta } from '../utils/usePageMeta';

const Hero = () => (
  <section className="relative pt-48 pb-32 px-8 flex flex-col items-center text-center z-10 border-b border-white/5">
    <div className="inline-flex items-center mb-8 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 backdrop-blur-xl">
      <span className="text-xs font-bold tracking-widest uppercase text-cyan-300 flex items-center">
        <span className="w-2.5 h-2.5 inline-block rounded-full bg-cyan-400 mr-3 animate-pulse"></span>
        AI-Powered Web Solutions & Templates
      </span>
    </div>

    <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] max-w-6xl">
      The AI Marketplace <br/>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">for Work & Life.</span>
    </h1>
    
    <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-4xl font-light leading-relaxed">
      Discover, customize, and deploy AI-powered templates for everything from business websites to personal budgeting. Or, have our experts build a custom solution for you.
    </p>

    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {['AI Automation', 'Business Templates', 'Personal Budgeting', 'Reseller Packages', 'Workflow Systems', 'Microsoft Excel'].map((item) => (
        <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
          {item}
        </span>
      ))}
    </div>
    
    <div className="flex flex-col sm:flex-row gap-6">
      <Link to="/marketplace" className="bg-white text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all">
        Explore Marketplace
      </Link>
      <Link to="/consulting" className="bg-white/[0.05] border border-white/20 backdrop-blur-xl text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-white/10 transition-all">
        Request Custom Build
      </Link>
    </div>
  </section>
);

const ValuePropsSection = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Plug-and-Play',
      description: 'Instantly deploy professional-grade systems without the setup overhead. Get started in minutes.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: 'Infinitely Scalable',
      description: 'Built on flexible frameworks that grow with your business, from solo ventures to enterprise teams.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414M19.778 19.778l-1.414-1.414M18.364 5.636l-1.414 1.414M4.222 19.778l1.414-1.414M12 12a6 6 0 110-12 6 6 0 010 12z" />
        </svg>
      ),
      title: 'Action-Oriented Design',
      description: 'Every template is focused on execution, helping you track progress and make data-driven decisions.',
    },
  ];

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto z-10 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Built for Action, Designed for Clarity</h2>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">Our templates aren't just documents; they are complete systems designed to integrate seamlessly into your daily operations and drive tangible results.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div key={feature.title} className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-md text-center flex flex-col items-center hover:bg-white/[0.05] hover:border-cyan-400/50 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * index }} viewport={{ once: true }}>
            <div className="w-16 h-16 mb-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-300">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-grow">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

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
    <motion.div className="bg-gradient-to-br from-white/[0.04] to-black/40 border border-white/10 rounded-[40px] p-10 md:p-16 backdrop-blur-md overflow-hidden relative" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
      
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
                Organize your pipeline with <strong>expert-designed Excel templates</strong> and scale operations using robust <strong>e-commerce inventory management solutions</strong>.
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
                Eliminate operational friction with <strong>scalable digital workspaces for entrepreneurs</strong>. Our templates provide expert-designed architecture for your projects.
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
                Adopt comprehensive <strong>business-in-a-box systems</strong>. Implement reliable <strong>freelance tax allocation strategies</strong> and leverage our frameworks to grow your enterprise.
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  </section>
);

import OptiVoicLanding from './OptiVoicLanding';

export default function Storefront() {
  return <OptiVoicLanding />;
}