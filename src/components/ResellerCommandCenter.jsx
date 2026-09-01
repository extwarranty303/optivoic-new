import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { supabase } from '../supabaseClient';
import CheckoutModal from './CheckoutModal';
import AuthModal from './AuthModal';
import BuyButton from './BuyButton';

export default function ResellerCommandCenter() {
  // --- State for purchase flow ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeFeatureTab, setActiveFeatureTab] = useState('fee-engine');
  const [template, setTemplate] = useState({
    id: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
    title: 'Reseller Command Center',
    price_cents: 9900
  });

  const [initialPurchasedInfo, setInitialPurchasedInfo] = useState(null);

  useEffect(() => {
    try {
      const savedPurchase = sessionStorage.getItem('optivoic_last_purchase');
      if (savedPurchase) {
        const parsed = JSON.parse(savedPurchase);
        setInitialPurchasedInfo(parsed);
        setIsCheckoutOpen(true);
        // BUG-004 FIX: clear so it doesn't re-open on every page refresh
        sessionStorage.removeItem('optivoic_last_purchase');
      }
    } catch (e) {
      console.warn("Restore purchase notice:", e);
    }

    const fetchData = async () => {
      let { data: prodData } = await supabase
        .from('products')
        .select('*')
        .eq('id', 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6')
        .maybeSingle();

      if (!prodData) {
        const { data: fallbackProd } = await supabase
          .from('products')
          .select('*')
          .ilike('title', '%Reseller%')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        prodData = fallbackProd;
      }

      if (prodData) {
        setTemplate(prodData);
      }

      const { data: { user: userData } } = await supabase.auth.getUser();
      setUser(userData);
    };

    fetchData();
  }, []);

  usePageMeta({
    title: 'Reseller Command Center — Inventory & Profit Tracker',
    description: 'The premier Reseller Command Center template. Track inventory, calculate net profit margins, manage multi-channel listings, and streamline reselling operations.',
    keywords: 'reseller command center, reseller templates, inventory profit tracker, multi-channel reseller software, reselling business spreadsheet, eBay profit calculator template',
    canonical: 'https://www.optivoic.com/reseller-command-center',
    robots: 'index, follow',
    ogType: 'product',
    priceAmount: '99.00',
    priceCurrency: 'USD'
  });

  const handlePurchaseSuccess = () => {
    setIsCheckoutOpen(false);
    // BUG-003/007 FIX: trigger AuthModal for guests, redirect portal for logged-in users
    if (!user) {
      setIsAuthOpen(true);
    } else {
      window.location.href = '/portal';
    }
  };

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
    <>
      {/* Full-width Feature Collage Banner at the top */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-4">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-[0_0_60px_rgba(6,182,212,0.18)] backdrop-blur-xl">
          <img 
            src="https://wekjabmdztgkhfszgyeg.supabase.co/storage/v1/object/public/general/gemini-reseller-collage.png" 
            alt="Reseller Command Center Preview Collage" 
            className="w-full h-auto object-cover hover:scale-[1.005] transition-transform duration-500"
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 pt-4">
        <div className="lg:col-span-7">
          <div className="mb-12 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-cyan-950/40 p-8 md:p-10 shadow-[0_0_80px_rgba(6,182,212,0.12)]">
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
              {workflows.map((item) => (
                <p key={item} className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Interactive System Capabilities & Workflow Spotlight */}
          <div className="mb-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-black p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 rounded-full inline-block mb-2">
                  ✨ Interactive System Capabilities
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Automated Workflows & Live Features</h2>
                <p className="text-gray-300 text-sm mt-1">Explore how the Reseller Command Center handles fee calculations, inventory velocity, and net margin controls.</p>
              </div>
            </div>

            {/* Interactive Feature Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-white/10 pb-4">
              {[
                { id: 'fee-engine', label: 'Profit & Fee Engine', icon: '⚡' },
                { id: 'sourcing-radar', label: 'Pre-Buy Sourcing', icon: '🔍' },
                { id: 'inventory-hub', label: 'Inventory Hub', icon: '📦' },
                { id: 'analytics', label: 'Live Analytics', icon: '📊' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeatureTab(tab.id)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all text-xs font-bold ${
                    activeFeatureTab === tab.id
                      ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(56,182,255,0.2)]'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-base mb-1">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Feature Spotlight Display Cards */}
            <div className="rounded-2xl border border-cyan-500/30 bg-black/80 p-6 md:p-8 space-y-6 shadow-[0_0_30px_rgba(56,182,255,0.15)]">
              {activeFeatureTab === 'fee-engine' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Module 01 // Multi-Channel Profit Engine</span>
                      <h3 className="text-xl font-bold text-white mt-1">Automated Fee & Tax Allocations</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold">
                      ✓ Live Profit Lock
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Automatically factors in platform commission rates (eBay 13.25%, Poshmark 20%, Mercari 10%, Shopify custom), payment processing fees, shipping costs, and state 1099 tax reserve percentages in real-time.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">Sample Gross Sale</span>
                      <span className="text-lg font-black text-white">$120.00</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">Item Cost Basis</span>
                      <span className="text-lg font-black text-amber-400">-$25.00</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">Platform & Ship Fees</span>
                      <span className="text-lg font-black text-rose-400">-$21.40</span>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-center">
                      <span className="text-[10px] text-cyan-300 block uppercase font-mono">Net Profit Margin</span>
                      <span className="text-lg font-black text-cyan-300">+$73.60 (61.3%)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeFeatureTab === 'sourcing-radar' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Module 02 // Sourcing Intelligence</span>
                      <h3 className="text-xl font-bold text-white mt-1">Auction & Estate Sale Pre-Buy Check</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold">
                      ⚡ &lt; 15s Sourcing Check
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Compare projected sold comps against auction bids or estate sale prices. Instantly see your minimum breakeven price and projected net ROI before putting cash on the table.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-gray-400 font-mono mb-1">Target ROI Threshold</div>
                      <div className="text-2xl font-black text-emerald-400">+150% ROI</div>
                      <div className="text-[11px] text-gray-400 mt-1">Pre-configured margin filter</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-gray-400 font-mono mb-1">Max Offer Target</div>
                      <div className="text-2xl font-black text-cyan-300">$35.00 Cap</div>
                      <div className="text-[11px] text-gray-400 mt-1">Protects minimum $40 net profit</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xs text-gray-400 font-mono mb-1">Sourcing Decision</div>
                      <div className="text-2xl font-black text-cyan-400">BUY CONFIRMED</div>
                      <div className="text-[11px] text-emerald-400 mt-1">High-velocity category</div>
                    </div>
                  </div>
                </div>
              )}

              {activeFeatureTab === 'inventory-hub' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Module 03 // Multi-Channel Control</span>
                      <h3 className="text-xl font-bold text-white mt-1">End-to-End Inventory Lifecycle</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold">
                      📦 Multi-Channel Sync
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Track every single item with SKU identifiers, location bin tags, listing dates, and multi-channel cross-listing status (Draft → Active → Sold → Shipped).
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">DRAFT</span>
                      <span className="text-gray-500">→</span>
                      <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">ACTIVE</span>
                      <span className="text-gray-500">→</span>
                      <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">SOLD</span>
                      <span className="text-gray-500">→</span>
                      <span className="px-2 py-1 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">SHIPPED</span>
                    </div>
                    <div className="text-gray-300 font-bold">
                      Zero duplicate listings or lost stock
                    </div>
                  </div>
                </div>
              )}

              {activeFeatureTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Module 04 // Executive Dashboard</span>
                      <h3 className="text-xl font-bold text-white mt-1">Live Profit Velocity & Tax Summary</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
                      📈 Instant Analytics
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Get clear monthly metrics: gross revenue, total inventory asset value, net profit velocity, and estimated tax reserves ready for quarterly filing.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] text-gray-400 block font-mono uppercase">Inventory Valuation</span>
                      <span className="text-lg font-black text-cyan-300">$14,850.00</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <span className="text-[10px] text-gray-400 block font-mono uppercase">Average Profit / Sale</span>
                      <span className="text-lg font-black text-emerald-400">$32.40</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center col-span-2 md:col-span-1">
                      <span className="text-[10px] text-gray-400 block font-mono uppercase">Estimated Tax Set-Aside</span>
                      <span className="text-lg font-black text-violet-300">15.0% Auto-Bucket</span>
                    </div>
                  </div>
                </div>
              )}
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
              {modules.map((moduleText) => (
                <div key={moduleText} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-black/20">
                  <h3 className="text-lg font-semibold text-white mb-2">{moduleText}</h3>
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
                <p className="text-white font-semibold">Microsoft Excel Template</p>
                <p className="text-gray-400">Clean layouts, smart categories, and clear daily steps</p>
              </div>
              <div className="text-4xl font-black text-cyan-400">{template ? `$${(template.price_cents / 100).toFixed(2)}` : '$99.00'}</div>
            </div>

            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>From auction sourcing to resale execution in one place</span></li>
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>Simple structure for daily workflows and follow-up tasks</span></li>
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>Built to help you grow revenue while protecting margins</span></li>
              <li className="flex items-start gap-3"><span className="text-cyan-400">•</span><span>Includes the full template, PDF user guide, and ongoing support</span></li>
            </ul>

            <div className="flex flex-col items-center justify-center pt-2 w-full">
              <BuyButton template={template} user={user} redirectTo="/portal" />
            </div>
          </div>
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => { setIsAuthOpen(false); window.location.href = '/portal'; }}
      />

      {template && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          template={template}
          user={user}
          onSuccess={handlePurchaseSuccess}
          initialPurchasedInfo={initialPurchasedInfo}
        />
      )}
    </>
  );
}
