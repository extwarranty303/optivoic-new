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
    title: 'Reseller Command Center | Inventory & Profit Tracking Template | OptiVoic',
    description: 'The premier Reseller Command Center template. Track inventory, calculate net profit margins, manage multi-channel listings, and streamline reselling operations.',
    keywords: 'reseller command center, reseller templates, inventory profit tracker, multi-channel reseller software, reselling business spreadsheet, eBay profit calculator template',
    canonical: 'https://www.optivoic.com/reseller-command-center',
    robots: 'index, follow',
    ogType: 'product',
    priceAmount: '99.00',
    priceCurrency: 'USD'
  });

  const handlePurchaseSuccess = () => {
    console.log("Purchase successful!");
    setIsCheckoutOpen(false);
    // Optionally, redirect to a thank you page or dashboard
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

          {/* Promotional Video Preview & Ease of Use Section */}
          <div className="mb-16 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-black p-8 md:p-10 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 rounded-full inline-block mb-2">
                  🎥 3-Minute Video Demo
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Ease of Use & Key Benefits Preview</h2>
                <p className="text-gray-300 text-sm mt-1">See how the Reseller Command Center automates fee calculations and live profit tracking in seconds.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-black overflow-hidden relative group">
              <div className="aspect-video w-full bg-gradient-to-tr from-cyan-950 via-slate-950 to-black flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-20 h-20 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-3xl shadow-[0_0_35px_rgba(56,182,255,0.7)] group-hover:scale-110 transition-transform cursor-pointer">
                  ▶
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Watch Interactive System Walkthrough</h3>
                  <p className="text-xs text-gray-400 max-w-md">Discover how automatic eBay/Poshmark fee deductions, aging inventory alerts, and tax bucket reservations work out of the box.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">✓ 0 Formulas to Code</span>
                  <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">✓ Works in Google Sheets & Excel</span>
                  <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">✓ Instant Download</span>
                </div>
              </div>
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
        onClose={() => setIsAuthOpen(false)}
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
