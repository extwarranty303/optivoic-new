import React from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

const NoiseOverlay = () => (
  <div
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

export default function ResellerCommandCenter() {
  usePageMeta({
    title: 'Reseller Command Center | OptiVoic Marketplace',
    description: 'A daily workflow system that helps resellers move from auction sourcing to resale with clarity, speed, and stronger profits.',
    ogType: 'product',
    priceAmount: '49.99',
    priceCurrency: 'USD'
  });

  const workflows = [
    'Track every auction win, listing, and sale in one place.',
    'Compare item cost, fees, shipping, and margin before you list.',
    'Keep your daily sourcing and restock tasks organized without the chaos.'
  ];

  const modules = [
    'Auction Radar: capture item ideas, costs, and sourcing notes quickly.',
    'Profit Engine: calculate fees, shipping, and expected margin with confidence.',
    'Inventory Flow: move products from incoming to listed to sold in a clear rhythm.',
    'Daily Planner: structure your week with priorities, restocks, and follow-ups.',
    'Sales Snapshot: see what is moving, what is stalled, and what is worth scaling.'
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative flex flex-col">
      <NoiseOverlay />

      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-violet-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl">
        <Link to="/marketplace" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Marketplace
        </Link>
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400">Template Package</span>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 flex-grow">
        <div className="lg:col-span-7">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Essential Business Workflow
            </span>
          </div>

          <div className="mb-16 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-cyan-950/40 p-8 md:p-10 shadow-[0_0_80px_rgba(6,182,212,0.12)]">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-3xl shadow-lg shadow-cyan-500/10">
              🛍️
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              Reseller Command Center
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              Turn the auction-to-resale journey into a calm, repeatable system that helps you move faster, stay organized, and protect your margins.
            </p>
          </div>

          <div className="mb-16 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">Why this template package works</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              {workflows.map((item, index) => (
                <p key={index} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-cyan-400">Built for daily reselling success</h2>
              <p className="text-lg text-gray-300">
                The package is designed to make your workflow feel clear from first pickup to final sale.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {modules.map((module, index) => (
                <div key={index} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/20">
                  <h3 className="text-lg font-semibold text-white mb-2">{module}</h3>
                  <p className="text-sm text-gray-400">A streamlined step that keeps your workflow simple and profitable.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-cyan-500/10 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-amber-300 mb-3">Designed to increase sales and maximize profits</h2>
            <p className="text-gray-300 leading-relaxed">
              This system keeps your sourcing, pricing, inventory, and follow-up tasks aligned so your business can scale without the overwhelm.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="sticky top-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Instant Template Access</p>
            <div className="flex items-end justify-between mb-8 pb-8 border-b border-white/10">
              <div>
                <p className="text-white font-semibold">Excel & Google Sheets</p>
                <p className="text-gray-400">Clean layouts, smart categories, and clear daily steps</p>
              </div>
              <div className="text-4xl font-black text-cyan-400">$39.99</div>
            </div>

            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>From auction sourcing to resale execution in one place</span></li>
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>Simple structure for daily workflows and follow-up tasks</span></li>
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>Built to help you grow revenue while protecting margins</span></li>
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>Includes the full template, PDF user guide + FAQ, slide presentation, and ongoing support</span></li>
            </ul>

            <div className="flex flex-col gap-3">
              <Link to="/marketplace" className="text-center rounded-full bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400">
                Explore Marketplace
              </Link>
              <Link to="/" className="text-center rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition hover:border-cyan-400/40 hover:text-cyan-300">
                Back to Storefront
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
