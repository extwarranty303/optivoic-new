import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <NoiseOverlay />
      <div className="fixed top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex items-center bg-black/30 backdrop-blur-2xl">
        <Link to="/" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Storefront
        </Link>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-gray-500 mb-12 uppercase tracking-widest text-sm font-bold">Last Updated: February 2026</p>

        <div className="space-y-10 text-lg leading-relaxed font-light">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using the services, templates, and consulting provided by OptiVöic ("Company", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services or purchase our digital products.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property & Licensing</h2>
            <p>All digital frameworks, operational templates, code snippets, and site copy provided by OptiVöic are the exclusive, proprietary intellectual property of the Company. Upon purchase, you are granted a revocable, non-exclusive, non-transferable license to use the digital goods solely for your personal or internal business operations.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-red-400 mb-4">3. Digital Goods & No Refund Policy</h2>
            <p>Due to the irrevocable and instantly accessible nature of digital goods, software, and downloadable templates, **all sales are final**. We do not offer refunds, exchanges, or cancellations once a secure download link has been generated and accessed.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>OptiVöic provides technical consulting, e-commerce strategy, and digital frameworks "as is" and makes no express or implied guarantees regarding specific financial outcomes, investment returns, or business scaling results.</p>
          </section>
        </div>
      </main>
      {/* Footer */}
      <Footer />  
    </div>
  );
}