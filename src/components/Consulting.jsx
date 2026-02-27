import React from 'react';
import { Link } from 'react-router-dom';

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" 
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

export default function Consulting() {
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <NoiseOverlay />
      
      {/* Ambient Background Orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      {/* Minimal Navbar */}
      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl shadow-lg">
        <Link to="/" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Storefront
        </Link>
        <div className="text-xl font-black text-white tracking-tighter drop-shadow-lg">
          OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
        </div>
      </nav>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="px-8 pt-32 pb-20 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center mb-8 px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-xl">
            <span className="text-xs font-bold tracking-widest uppercase text-violet-300 flex items-center">
              Fractional Engineering & Strategy
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight drop-shadow-2xl">
            Remove bottlenecks. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Accelerate scaling.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            We don't just write code or copy; we architect systems. Partner with OptiVöic for elite technical implementation, precise AI evaluation, and data-driven e-commerce scaling.
          </p>
        </section>

        {/* CSS INFOGRAPHIC: OUR METHODOLOGY */}
        <section className="py-24 px-8 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 drop-shadow-md">The OptiVöic Methodology</h2>
              <p className="text-gray-400">A rigorous, four-step framework applied to every client engagement.</p>
            </div>

            {/* Visual Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting Line (Hidden on Mobile) */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-black border border-cyan-400/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(56,182,255,0.1)] group-hover:border-cyan-400 group-hover:shadow-[0_0_40px_rgba(56,182,255,0.4)] transition-all duration-500">
                  <span className="text-3xl font-black text-cyan-400">01</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Discovery</h3>
                <p className="text-sm text-gray-400 leading-relaxed">We audit your current tech stack, operational workflows, and market positioning to identify high-leverage bottlenecks.</p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-black border border-blue-400/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:border-blue-400 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500">
                  <span className="text-3xl font-black text-blue-400">02</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Architecture</h3>
                <p className="text-sm text-gray-400 leading-relaxed">We design a custom roadmap—whether that is a Python automation script, a database schema, or an SEO matrix.</p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-black border border-violet-400/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.1)] group-hover:border-violet-400 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-500">
                  <span className="text-3xl font-black text-violet-400">03</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Execution</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Rapid, high-fidelity development and implementation. Code is pushed, copy is published, and AI models are rigorously evaluated.</p>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-black border border-fuchsia-400/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(232,121,249,0.1)] group-hover:border-fuchsia-400 group-hover:shadow-[0_0_40px_rgba(232,121,249,0.4)] transition-all duration-500">
                  <span className="text-3xl font-black text-fuchsia-400">04</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Iteration</h3>
                <p className="text-sm text-gray-400 leading-relaxed">We analyze the data output, adjust the models, and refine the frameworks to ensure sustained, scalable ROI.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE CAPABILITIES */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-md">Core Capabilities</h2>
            <p className="text-xl text-gray-400 max-w-2xl">Specialized execution in e-commerce strategy, artificial intelligence evaluation, and custom software architecture.</p>
          </div>

          <div className="space-y-8">
            {/* Capability 1: Tech & AI */}
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-10 md:p-14 hover:bg-white/[0.04] transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-4">
                  <span className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-2 block">Stack 01</span>
                  <h3 className="text-3xl font-bold mb-4">Tech & AI Systems</h3>
                  <p className="text-gray-400 leading-relaxed">Stop wasting engineering hours on micro-tasks. We handle the technical heavy lifting so your core team can focus on the big picture.</p>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-white mb-2">AI Output Evaluation</h4>
                    <p className="text-sm text-gray-400">Human-in-the-loop evaluation for model training. We pressure-test prompts and grade responses with extreme precision.</p>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-white mb-2">Python Automation</h4>
                    <p className="text-sm text-gray-400">Custom, single-purpose scripts to automate data scraping, file organization, and massive operational loops.</p>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl sm:col-span-2">
                    <h4 className="text-lg font-bold text-white mb-2">Web & Database Architecture</h4>
                    <p className="text-sm text-gray-400">Isolated bug fixes and robust backend setups. We specialize in Node.js, React, Next.js, and rapidly deploying Firebase/Supabase infrastructures.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Capability 2: E-Commerce */}
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-10 md:p-14 hover:bg-white/[0.04] transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-4 md:order-last">
                  <span className="text-violet-400 text-sm font-bold uppercase tracking-widest mb-2 block">Stack 02</span>
                  <h3 className="text-3xl font-bold mb-4">E-Commerce & Reselling</h3>
                  <p className="text-gray-400 leading-relaxed">Turn inventory into revenue faster. We bring enterprise-level market analysis to the luxury, vintage, and collectible markets.</p>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:order-first">
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-white mb-2">SEO-Optimized Copy</h4>
                    <p className="text-sm text-gray-400">Batch-creation of highly descriptive, high-converting product titles for eBay, Depop, and Etsy.</p>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                    <h4 className="text-lg font-bold text-white mb-2">Valuation Matrix</h4>
                    <p className="text-sm text-gray-400">Deep market research to determine the optimal pricing strategy for rare or niche items.</p>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl sm:col-span-2">
                    <h4 className="text-lg font-bold text-white mb-2">Platform Copyediting</h4>
                    <p className="text-sm text-gray-400">Rapid proofreading and copyediting for digital storefronts, ensuring your brand reads like a Fortune 500 company.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MASSIVE CTA CLOSER */}
        <section className="py-32 px-8 text-center relative overflow-hidden border-t border-white/5 bg-white/[0.01]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-8 relative z-10 tracking-tight">
            Ready to scale?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto relative z-10">
            Book a free 30-minute discovery call. We will audit your current stack and build a preliminary roadmap on the spot.
          </p>
          <a href="mailto:consulting@optivoic.com" className="relative z-10 inline-block bg-white text-black font-bold text-xl py-5 px-14 rounded-full hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.7)] transition-all duration-300">
            Book a Consultation
          </a>
        </section>

      </main>

      
      {/* Footer */}
      <Footer />
    </div>
  );
}