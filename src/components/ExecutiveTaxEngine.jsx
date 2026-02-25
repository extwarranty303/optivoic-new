import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from '../supabaseClient';
import AuthModal from './AuthModal';
import { usePageMeta } from '../utils/usePageMeta';

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" 
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

export default function ExecutiveTaxEngine() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'auto' });

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  const productsById = {
    "526dcf30-0990-458e-bba7-b9f1c7e99078": {
    id: "executive-tax-engine",
    dbId: 1, // <-- numeric template_id stored in Supabase for this product (replace with real ID)

    title: "Executive Tax Engine - Business in a Box for 1099 Pros",
    price: 19.99,
    category: "Essential Business Tools",
    format: "Excel & Google Sheets",
    description: "Stop guessing your 1099 taxes. The Executive Tax Engine is a powerful, automated template designed to track fragmented income, calculate quarterly tax liability, and map deductions for stress-free tax season.",
    features: [
      "Schedule C Auto-Mapper (CPA Replacement): Automatically aggregates expenses and maps them to IRS Form 1040 Schedule C line numbers for instant TurboTax integration.",
      "Smart Reseller Inventory & COGS Tracker: Automatically calculates Net Profit, Profit Margin %, and exact ROI % for every item with color-coded statuses.",
      "Idiot-Proof Smart Lock Technology: Master formulas and dashboards are mathematically locked so you cannot break them while logging unlimited data.",
      "Live Real-Time Tax Dashboard: Watch your Estimated Quarterly Tax Liability update instantly as you log expenses.",
      "2026 IRS Mileage & Home Office Automations: Automatically multiplies business drives by 72.5¢/mile and calculates Home Office Deduction using IRS Simplified Method.",
      "1-Click Professional Invoice Generator: Create clean, formatted invoices with auto-calculated taxes and subtotals—save as PDF in one keystroke."
    ]
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      <NoiseOverlay />

      {usePageMeta({
        title: product.title,
        description: product.description,
        ogType: 'product',
        priceAmount: product.price,
        priceCurrency: 'USD'
      })}
      
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl">
        <Link to="/" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Storefront
        </Link>
        {user && <span className="text-xs text-gray-400">Logged in as: {user.email}</span>}
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: Sales Copy */}
        <div className="lg:col-span-7">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              {product.category}
            </span>
          </div>

          {/* Hero Section */}
          <div className="mb-16">
            <img 
              src="https://placehold.co/1400x700/0a1d37/f4e4bc/png?text=Dashboard+%26+COGS+Mockup" 
              alt="Executive Tax Engine Dashboard and COGS tab on laptop and iPad" 
              className="w-full rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg leading-tight">
              Stop Guessing Your 1099 Taxes. Start Running Your Business.
            </h1>
            <p className="text-xl text-gray-300 mb-6 font-light">
              The "Business in a Box" Spreadsheet for Freelancers, Gig Workers, and E-Commerce Resellers.
            </p>
          </div>

          {/* Problem Section */}
          <div className="mb-16 bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">⚠️ Managing 1099 Income Doesn't Have to Be a Nightmare</h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                If you are driving for Uber, flipping inventory on eBay, and taking freelance design clients, standard budgeting spreadsheets aren't going to cut it.
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span><strong>You're leaving money on the table:</strong> Missing out on massive IRS deductions like the home office and mileage rates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span><strong>You're flying blind on inventory:</strong> Guessing your e-commerce profit margins instead of knowing your exact ROI.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span><strong>You're terrified of April 15th:</strong> Scrambling to figure out what you owe the IRS because you didn't save enough for quarterly taxes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold mt-1">•</span>
                  <span><strong>You're breaking your spreadsheets:</strong> Accidentally deleting a formula and ruining your entire financial tracking system.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Solution Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4 text-cyan-400">💎 Meet the Executive Tax Engine</h2>
              <p className="text-xl text-gray-300">
                Built with a professional luxury aesthetic, this isn't just a spreadsheet—it's an automated back-office.
              </p>
            </div>

            <div className="space-y-6">
              {product.features.map((feature, idx) => {
                const [title, description] = feature.split(': ');
                return (
                  <div key={idx} className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
                    <h3 className="text-xl font-bold mb-3 text-cyan-300">✅ {title}</h3>
                    <p className="text-gray-300 leading-relaxed">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Design Section */}
          <div className="mb-16 bg-gradient-to-r from-slate-900/50 to-charcoal/50 border border-gold/20 rounded-3xl p-10 backdrop-blur-xl">
            <h2 className="text-3xl font-bold mb-4 text-gold text-center">🎨 Beautiful Bookkeeping</h2>
            <p className="text-gray-300 leading-relaxed text-center text-lg">
              Spreadsheets shouldn't look like a 1990s math textbook. The Executive Tax Engine features a deeply satisfying Deep Charcoal Navy and Champagne Gold color palette. Built with a clean, gridless layout and alternating subtle zebra-striped rows, it reduces eye strain and looks like a bespoke piece of financial software.
            </p>
          </div>

          {/* Who For Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center">🎯 Who is this for?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700 text-center">
                <h3 className="text-lg font-bold text-cyan-300 mb-2">E-Commerce Resellers</h3>
                <p className="text-gray-400 text-sm">(eBay, Poshmark, Mercari, Vintage Flippers)</p>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700 text-center">
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Gig Economy Drivers</h3>
                <p className="text-gray-400 text-sm">(Uber, Lyft, DoorDash, Instacart)</p>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700 text-center">
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Freelance Creatives</h3>
                <p className="text-gray-400 text-sm">(Designers, Writers, Photographers)</p>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700 text-center">
                <h3 className="text-lg font-bold text-cyan-300 mb-2">Independent Consultants</h3>
                <p className="text-gray-400 text-sm">(Contractors & Business Owners)</p>
              </div>
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center">🛡️ What You Get</h2>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li className="flex items-start gap-4">
                <span className="text-gold font-bold">✓</span>
                <span><strong>1x Executive Tax Engine</strong> (Blank Master Template)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gold font-bold">✓</span>
                <span><strong>1x Pre-Filled Example File</strong> (So you can see exactly how it works on day one)</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gold font-bold">✓</span>
                <span><strong>Step-by-step Instructions</strong> built right into the dashboard</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gold font-bold">✓</span>
                <span><strong>Universal Formatting:</strong> Upload to Google Sheets, open in Microsoft Excel, or use in Mac Numbers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Checkout */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-10 bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-3xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            
            <div className="flex justify-between items-end mb-8 pb-8 border-b border-white/10">
              <div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Instant Digital Download</p>
                <p className="text-white font-medium">{product.format}</p>
              </div>
              <div className="text-4xl font-light text-white drop-shadow-md">
                ${product.price}
              </div>
            </div>

            <div className="min-h-[150px] relative z-20 flex flex-col justify-center mb-6">
              {!user ? (
                <div className="text-center bg-black/40 border border-white/10 rounded-2xl p-6">
                  <p className="text-gray-300 mb-4 text-sm">You must have an OptiVöic account to access your digital downloads securely.</p>
                  <button 
                    onClick={() => setIsAuthOpen(true)}
                    className="w-full bg-cyan-400 text-black font-bold py-3 rounded-full hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all"
                  >
                    Create Account to Checkout
                  </button>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-2xl shadow-inner">
                  <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
                    <PayPalButtons 
                      style={{ layout: "vertical", shape: "rect", color: "black" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{
                            description: product.title,
                            amount: { value: product.price.toString() }
                          }]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        
                        const { error } = await supabase.from('purchases').insert([
                          {
                            user_id: user.id,
                            user_email: user.email,
                            template_id: product.dbId || product.id
                          }
                        ]);

                        if (error) {
                          alert("Payment succeeded, but there was an error generating your link. Please contact support.");
                          console.error(error);
                        } else {
                          alert(`Success! Thank you, ${details.payer.name.given_name}. Redirecting to your secure portal...`);
                          navigate('/portal');
                        }
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>

            <div className="space-y-4 text-center">
              <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                🔒 Secured via 256-bit Encryption
              </p>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-xs text-red-200/70 font-medium leading-relaxed text-left">
                  <span className="font-bold text-red-400 block mb-1">Strict No-Refund Policy</span>
                  Due to the irrevocable nature of digital goods, all sales are final. We cannot offer refunds, exchanges, or cancellations once the secure download link has been accessed. By completing this purchase, you agree to these terms.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} redirectTo={location.pathname} />    </div>
  );
}
