import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

export default function TemplateDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Authentication State
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in when the page loads
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    // Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => { subscription.unsubscribe(); };
  }, []);

  // product dictionary keyed by template ID.  Future improvement: fetch from Supabase instead.
  const productsById = {
    "36a7cc71-0c17-4530-a653-e59a8dbda7a3": {
      title: "The Ultimate E-Commerce Reseller Profit & COGS Tracker",
      price: 19.99,
      category: "Essential Business Trackers",
      format: "Excel & Google Sheets",
      description: "Stop guessing your true profit margins. Built specifically for serious resellers handling fine jewelry, designer toys, and vintage clothing, this automated system eliminates hidden fee leaks and turns chaotic inventory into clear, actionable business intelligence.",
      heroHeading: "Stop Guessing Your Profit Margins. Start Knowing Exactly What You Make.",
      heroSub: "The \"Business in a Box\" spreadsheet built for serious resellers who flip luxury, collectibles, and vintage goods.",
      problemCopy: [
        "You're losing money to hidden platform fees and shipping costs.",
        "You're flying blind on profit margins and inventory ROI.",
        "Your books break every time someone deletes a cell or overwrites a formula.",
        "You're stuck toggling between a dozen tabs just to get one accurate report."
      ],
      features: [
        "Automated COGS & Net Profit Calculations: Instantly see exactly what you make after costs.",
        "Dynamic Platform Fee Deductions: Pre-loaded algorithms for eBay, Poshmark, Mercari, Etsy, Depop, and more.",
        "Inventory Master to Sales Log Syncing: Dropdown menus seamlessly connect your stock to your sales.",
        "Built-in Payment Processing Fees: Automatically calculates standard transaction fees (e.g., 2.9% + $0.30) so you never miss a cent.",
        "Executive Dashboard: Real-time visualization of your Total Revenue and Total Profit."
      ],
      whoFor: [
        { title: "E-Commerce Resellers", subtitle: "(eBay, Poshmark, Mercari, Vintage Flippers)" },
        { title: "Gig Economy Sellers", subtitle: "(Etsy shops, small wholesale stores)" },
        { title: "Collectors & Flippers", subtitle: "(Antiques, luxury watches, hype sneakers)" },
        { title: "Retail Arbitrage Entrepreneurs", subtitle: "(Thrift flips, clearance arbitrage)" }
      ],
      deliverables: [
        "1x Optivoic E-Commerce Reseller Profit & COGS Tracker (Blank Master Template)",
        "1x Pre-filled example file so you can hit the ground running",
        "Step-by-step \"Start Here\" instructions built into the dashboard",
        "Universal formatting: Google Sheets, Excel or Mac Numbers"
      ]
    }
  };

  const product = productsById[id] || {
    title: "Unknown Template",
    price: 0,
    category: "",
    format: "",
    description: "",
    features: [],
    heroHeading: "",
    heroSub: "",
    problemCopy: [],
    whoFor: [],
    deliverables: []
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      <NoiseOverlay />

      {usePageMeta({
        title: `${product.title} | OptiVöic Marketplace`,
        description: product.description,
        ogType: 'product',
        priceAmount: product.price.toString(),
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
              src="https://placehold.co/1400x700/0a1d37/f4e4bc/png?text=Reseller+Dashboard+Mockup"
              alt="Reseller Tracker dashboard screenshot"
              className="w-full rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg leading-tight">
              {product.heroHeading || product.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6 font-light">
              {product.heroSub || product.description}
            </p>
          </div>

          {/* Problem Section */}
          <div className="mb-16 bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">⚠️ Why Reseller Spreadsheets Fail You</h2>
            <div className="space-y-4 text-gray-300">
              {product.problemCopy.map((line, i) => (
                <p key={i} className="text-lg leading-relaxed">{line}</p>
              ))}
            </div>
          </div>

          {/* Solution Section */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4 text-cyan-400">💎 Meet the Reseller Profit & COGS Tracker</h2>
              <p className="text-xl text-gray-300">
                Built with a clean, gridless interface and automations that do the math for you.
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
              Spreadsheets shouldn't look like a 1990s math textbook. The Optivoic Reseller Tracker features a deep charcoal/navy palette with champagne gold accents, zebra rows, and locked formulas so you can work without fear.
            </p>
          </div>

          {/* Who For Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center">🎯 Who is this for?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.whoFor.map((who, i) => (
                <div key={i} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-700 text-center">
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">{who.title}</h3>
                  <p className="text-gray-400 text-sm">{who.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-cyan-400 text-center">🛡️ What You Get</h2>
            <ul className="space-y-4 text-gray-300 text-lg">
              {product.deliverables.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-gold font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Checkout */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-10 bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-3xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
            
            <div className="flex justify-between items-end mb-8 pb-8 border-b border-white/10">
              <div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Instant Download</p>
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
                            amount: { 
                              value: product.price.toString(),
                              currency_code: "USD"
                            }
                          }]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        
                        const { error } = await supabase.from('purchases').insert([
                          {
                            user_id: user.id,
                            user_email: user.email,
                            template_id: id 
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

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}