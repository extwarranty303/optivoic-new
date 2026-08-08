import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import BuyButton from './BuyButton';
import { usePageMeta } from '../utils/usePageMeta';
import Footer from './Footer';

const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" 
    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
  ></div>
);

export default function ExecutiveTaxEngine() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const productId = "526dcf30-0990-458e-bba7-b9f1c7e99078";

  useEffect(() => {
    // scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'auto' });

    const fetchProduct = async () => {
      setLoading(true);
      let { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .maybeSingle();

      if (!data) {
        const { data: fallback } = await supabase
          .from('products')
          .select('*')
          .ilike('title', '%Tax%')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        data = fallback;
      }

      setProduct(data || null);
      setLoading(false);
    };

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    fetchProduct();
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  usePageMeta({
    title: '1099 Executive Tax Estimation Tool & Calculator | Optivoic',
    description: 'Quarterly tax estimation template for freelancers, contractors, and 1099 executives. Reserve tax allocations automatically, track write-offs, and preserve cash flow.',
    keywords: '1099 executive tax estimation tool, contractor tax calculator template, quarterly estimated tax spreadsheet, freelancer tax allocation, business tax planner',
    canonical: 'https://www.optivoic.com/tax-engine',
    robots: 'index, follow',
    ogType: 'product',
    priceAmount: product ? (product.price_cents / 100).toFixed(2) : '24.99',
    priceCurrency: 'USD'
  });

  if (loading) {
    return <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center"><p className="text-xl animate-pulse">Loading Product Details...</p></div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center"><p>Product not found.</p></div>;
  }

  return (
    // FIX 2a: Added 'flex flex-col' so the layout can push the footer down
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative flex flex-col">
      <NoiseOverlay />
      
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-6 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl">
        <Link to="/" className="text-gray-400 hover:text-cyan-400 font-semibold flex items-center gap-2 transition-colors">
          <span>←</span> Back to Storefront
        </Link>
        {user && <span className="text-xs text-gray-400">Logged in as: {user.email}</span>}
      </nav>

      {/* FIX 2b: Added 'flex-grow' to main so it claims vertical space and pins the footer to the bottom */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 flex-grow">
        
        {/* LEFT COLUMN: Sales Copy */}
        <div className="lg:col-span-7">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              {product.category_name}
            </span>
          </div>

          {/* Hero Section */}
          <div className="mb-16">
            <img 
              src="/assets/gig-tax-tracker.png" 
              alt="Executive Tax Engine Dashboard and COGS tab on laptop and iPad" 
              className="w-full rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg leading-tight">
              {product.hero_heading || product.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6 font-light">
              {product.hero_sub || product.description}
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
              {product.features?.map((feature, idx) => {
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
                <span><strong>Comprehensive PDF user guide and FAQ</strong> for setup, usage, and common questions</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gold font-bold">✓</span>
                <span><strong>Slide presentation deck</strong> for walkthroughs, onboarding, or client training</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-gold font-bold">✓</span>
                <span><strong>Universal Formatting:</strong> Formatted specifically for Microsoft Excel</span>
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
                <p className="text-white font-medium">{product.format || 'Digital File'}</p>
              </div>
              <div className="text-4xl font-light text-white drop-shadow-md">
                {`$${(product.price_cents / 100).toFixed(2)}`}
              </div>
            </div>

            <div className="flex flex-col justify-center mb-6">
              <BuyButton template={product} user={user} redirectTo="/portal" />
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
    </div>
  );
}
