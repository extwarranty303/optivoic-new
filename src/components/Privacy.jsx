import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <NoiseOverlay />
      <div className="fixed bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex items-center bg-black/30 backdrop-blur-2xl">
        <Link to="/" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Storefront
        </Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">Last Updated: February 2026</p>

        <div className="space-y-10 text-lg leading-relaxed font-light">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information Collection</h2>
            <p>OptiVöic collects information necessary to deliver our technology consulting services, process digital transactions, and continuously improve our user experience. This includes information you voluntarily provide and data collected automatically when you navigate our platform.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Use of Google Demographics & Analytics</h2>
            <p>To optimize our digital storefront and sales funnel, we utilize Google Analytics and Google Demographics reporting. These tools automatically collect aggregate, non-personally identifiable information regarding user behavior, age ranges, general geographic locations, and site engagement patterns.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security & Payment Processing</h2>
            <p>We do not store or process your credit card data directly on our servers. All financial transactions are securely handled by compliant third-party payment processors utilizing industry-standard 256-bit encryption.</p>
          </section>
        </div>
      </main>
      {/* Footer */}
      <Footer />  
    </div>
  );
}