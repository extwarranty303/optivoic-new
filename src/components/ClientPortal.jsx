import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { fetchBookmarks, toggleBookmark } from '../utils/bookmarkManager';
import CheckoutModal from './CheckoutModal';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

const COMPLEMENTARY_TEMPLATES = [
  {
    id: 'executive-tax-engine',
    title: 'Executive 1099 Tax Engine v2.4',
    category_name: 'Financial Frameworks',
    original_price: '$49.00',
    discounted_price: '$41.65',
    savings: 'Save $7.35',
    price_cents: 4900,
    description: 'Quarter-by-quarter tax allocation, write-off bucket automation, and quarterly liquidity manager.'
  },
  {
    id: 'reseller-command-center',
    title: 'Turnkey Reseller Command Center v2.4',
    category_name: 'Operational Systems',
    original_price: '$99.00',
    discounted_price: '$84.15',
    savings: 'Save $14.85',
    price_cents: 9900,
    description: 'Multi-platform inventory tracking, automatic fee calculations, and real-time net margin dashboard.'
  }
];

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [projects, setProjects] = useState([]); 
  const [products, setProducts] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [savedArticles, setSavedArticles] = useState([]);
  
  // Cohesive Workspace Navigation & Search State
  const [activeTab, setActiveTab] = useState('all'); // 'templates' | 'vault' | 'sprints_support' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickStart, setActiveQuickStart] = useState(null);
  const [activeChangelog, setActiveChangelog] = useState(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);
  const [upgradeTemplate, setUpgradeTemplate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortalData = async () => {
      // 1. Check Security Session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/'); 
        return;
      }
      setUser(session.user);

      // 2. Fetch User's Purchases (by user_id or email match)
      const { data: userPurchases } = await supabase
        .from('purchases')
        .select('*')
        .or(`user_id.eq.${session.user.id},user_email.ilike.${session.user.email}`)
        .order('created_at', { ascending: false });

      if (userPurchases && userPurchases.length > 0) {
        setPurchases(userPurchases);

        // Auto-link any unlinked purchases to this logged-in account
        const unlinkedIds = userPurchases.filter(p => !p.user_id).map(p => p.id);
        if (unlinkedIds.length > 0) {
          await supabase
            .from('purchases')
            .update({ user_id: session.user.id })
            .in('id', unlinkedIds);
        }
      }

      // 3. Fetch Live Products to map to purchases
      const { data: productsData } = await supabase
        .from('products')
        .select('*');

      if (productsData) {
        const prodMap = {};
        productsData.forEach(p => { prodMap[p.id] = p; });
        setProducts(prodMap);
      }

      // 4. Fetch User's Consulting Sprints
      const { data: userProjects } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (userProjects) {
        setProjects(userProjects);
      }

      // 5. Check if user is an authorized admin
      const { data: adminCheck } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      setIsAdmin(!!adminCheck);
      setLoading(false);
    };

    fetchPortalData();

    // 6. Load Saved Articles / Bookmarks from Supabase / Local Storage
    const loadSavedArticles = async () => {
      const bks = await fetchBookmarks();
      setSavedArticles(bks);
    };

    loadSavedArticles();

    const handleBookmarksUpdate = async () => {
      const bks = await fetchBookmarks();
      setSavedArticles(bks);
    };

    window.addEventListener('optivoic_bookmarks_updated', handleBookmarksUpdate);
    return () => window.removeEventListener('optivoic_bookmarks_updated', handleBookmarksUpdate);
  }, [navigate]);

  const handleRemoveBookmark = async (post) => {
    await toggleBookmark(post);
    const bks = await fetchBookmarks();
    setSavedArticles(bks);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleDownload = async (targetProductId) => {
    if (!targetProductId) {
      alert("Product ID missing from purchase record.");
      return;
    }

    setDownloadingId(targetProductId);

    try {
      let fileRecord = null;
      let targetProduct = products[targetProductId];

      // Tier 1: Check if product has current_file_id directly
      if (targetProduct && targetProduct.current_file_id) {
        const { data: directFile } = await supabase
          .from('files')
          .select('*')
          .eq('id', targetProduct.current_file_id)
          .maybeSingle();

        if (directFile) {
          fileRecord = directFile;
        }
      }

      // Tier 2: Search files table matching product_id
      if (!fileRecord) {
        const { data: productFiles } = await supabase
          .from('files')
          .select('*')
          .eq('product_id', targetProductId)
          .order('created_at', { ascending: false });

        if (productFiles && productFiles.length > 0) {
          fileRecord = productFiles[0];
        }
      }

      // Tier 3: Search files table by product title match
      if (!fileRecord && targetProduct && targetProduct.title) {
        const { data: titleFiles } = await supabase
          .from('files')
          .select('*')
          .ilike('filename', `%${targetProduct.title}%`)
          .order('created_at', { ascending: false });

        if (titleFiles && titleFiles.length > 0) {
          fileRecord = titleFiles[0];
        }
      }

      // Tier 4: Storage bucket scan fallback
      let storagePath = null;
      let originalFilename = targetProduct ? `${targetProduct.title.replace(/[^a-zA-Z0-9]/g, '_')}.zip` : `template_${targetProductId}.zip`;

      if (fileRecord && fileRecord.storage_path) {
        storagePath = fileRecord.storage_path;
        originalFilename = fileRecord.original_filename || fileRecord.filename || originalFilename;
      } else {
        const { data: bucketFiles, error: bucketErr } = await supabase
          .storage
          .from('templates')
          .list('', { limit: 100 });

        if (!bucketErr && bucketFiles && bucketFiles.length > 0) {
          const match = bucketFiles.find(f => 
            f.name.toLowerCase().includes(String(targetProductId).toLowerCase()) ||
            (targetProduct && f.name.toLowerCase().includes(targetProduct.title.toLowerCase()))
          ) || bucketFiles[0];

          if (match) {
            storagePath = match.name;
            originalFilename = match.name;
          }
        }
      }

      if (!storagePath) {
        throw new Error("File payload is being prepared. Access it anytime in your OptiVoic Portal.");
      }

      const { data: signedData, error: signError } = await supabase
        .storage
        .from('templates')
        .createSignedUrl(storagePath, 60, {
          download: originalFilename
        });

      if (signError || !signedData?.signedUrl) {
        throw new Error(signError?.message || "Unable to generate download link.");
      }

      const link = document.createElement('a');
      link.href = signedData.signedUrl;
      link.setAttribute('download', originalFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error("Download error:", err);
      alert(`Download status: ${err.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleSendSupport = (e) => {
    e.preventDefault();
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setIsSupportOpen(false);
      setSupportMessage('');
    }, 2500);
  };

  // Filtered lists for Universal Search
  const filteredPurchases = useMemo(() => {
    if (!searchQuery.trim()) return purchases;
    const q = searchQuery.toLowerCase();
    return purchases.filter(p => {
      const prod = products[p.product_id || p.template_id];
      const title = prod?.title || p.title || '';
      return title.toLowerCase().includes(q);
    });
  }, [purchases, products, searchQuery]);

  const filteredBookmarks = useMemo(() => {
    if (!searchQuery.trim()) return savedArticles;
    const q = searchQuery.toLowerCase();
    return savedArticles.filter(a => 
      (a.title || '').toLowerCase().includes(q) || 
      (a.category || '').toLowerCase().includes(q)
    );
  }, [savedArticles, searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase();
    return projects.filter(p => (p.project_name || '').toLowerCase().includes(q));
  }, [projects, searchQuery]);

  if (loading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center text-cyan-400 font-bold animate-pulse tracking-widest uppercase">Decrypting OptiVoic Portal...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      <NoiseOverlay />
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      {/* Top Navbar */}
      <nav className="relative z-50 border-b border-white/10 py-5 px-8 flex justify-between items-center bg-black/50 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white tracking-tight">
            OptiVoic Portal
          </span>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Executive Workspace
          </span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          {isAdmin && (
            <div className="hidden sm:flex items-center gap-2">
              <Link 
                to="/admin" 
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-bold px-3 py-1.5 rounded transition-all tracking-widest uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Admin Panel
              </Link>
              <Link 
                to="/blog-admin" 
                className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 text-xs font-bold px-3 py-1.5 rounded transition-all tracking-widest uppercase"
              >
                Blog Admin
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsSupportOpen(true)}
            className="text-xs font-bold text-violet-300 hover:text-white bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>💬</span> Priority Support
          </button>

          <span className="text-sm text-gray-400 font-mono hidden md:block">{user?.email}</span>
          
          <button 
            onClick={handleSignOut}
            className="text-xs font-bold text-gray-300 hover:text-red-400 bg-white/5 border border-white/15 hover:border-red-500/30 hover:bg-red-500/10 px-4 py-2 rounded-full transition-all uppercase tracking-wider ml-2 cursor-pointer flex items-center gap-1.5"
            title="Log out of OptiVoic Portal"
          >
            <span>Sign Out</span>
            <span className="text-sm">↳</span>
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 py-10">
        
        {/* HEADER & WELCOME CARD */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              OPTIVOIC EXECUTIVE WORKSPACE
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm md:text-base">Access your unlocked templates, Knowledge Vault guides, and active agency sprints.</p>
          </div>

          {/* Universal Real-Time Search Bar */}
          <div className="w-full md:w-80">
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates, guides, or sprints..."
                className="w-full bg-white/5 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-black/50 transition-all pl-9"
              />
              <span className="absolute left-3 top-3.5 text-xs text-gray-500">🔍</span>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* EXECUTIVE OVERVIEW KPI RIBBON */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div 
            onClick={() => setActiveTab('templates')}
            className={`cursor-pointer transition-all p-5 rounded-2xl border backdrop-blur-xl ${activeTab === 'templates' ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(56,182,255,0.2)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Unlocked Templates</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{purchases.length}</span>
              <span className="text-xs text-cyan-400 font-bold">Active Assets</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('vault')}
            className={`cursor-pointer transition-all p-5 rounded-2xl border backdrop-blur-xl ${activeTab === 'vault' ? 'bg-yellow-500/10 border-yellow-500/40 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Knowledge Vault</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{savedArticles.length}</span>
              <span className="text-xs text-yellow-400 font-bold">Saved Guides</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('sprints_support')}
            className={`cursor-pointer transition-all p-5 rounded-2xl border backdrop-blur-xl ${activeTab === 'sprints_support' ? 'bg-violet-500/10 border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.2)]' : 'bg-white/[0.02] border-white/10 hover:border-white/20'}`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Active Sprints</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{projects.length}</span>
              <span className="text-xs text-violet-400 font-bold">Consulting</span>
            </div>
          </div>

          <div 
            className="p-5 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-cyan-500/10 backdrop-blur-xl"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 block mb-1">Portal Member Perk</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm font-bold text-emerald-400 tracking-wide">15% OFF Code: PORTAL15</span>
            </div>
          </div>
        </div>

        {/* PROMINENT MEMBER EXCLUSIVE DEAL SPOTLIGHT BANNER */}
        <section className="mb-10">
          <div className="rounded-3xl border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 via-amber-500/10 via-cyan-500/10 to-black p-6 md:p-8 backdrop-blur-2xl relative overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.15)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 inline-flex items-center gap-1.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                  ⚡ EXCLUSIVE PORTAL MEMBER DEAL
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Unlock Complementary Business Frameworks</h2>
                <p className="text-xs md:text-sm text-gray-300 mt-1">
                  As an active OptiVoic Portal member, save <strong className="text-emerald-400 font-mono">15% OFF</strong> any template package below. Code <code className="text-yellow-300 font-mono font-bold bg-black/60 px-2 py-0.5 rounded border border-yellow-500/30">PORTAL15</code> auto-applies at checkout!
                </p>
              </div>
            </div>

            {/* Featured Deal Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPLEMENTARY_TEMPLATES.map((item) => (
                <div key={item.id} className="bg-black/60 border border-white/15 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-yellow-500/40 transition-all">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                        {item.category_name}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {item.savings}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">{item.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-gray-500 line-through mr-2">{item.original_price}</span>
                      <span className="text-xl font-black text-emerald-400">{item.discounted_price}</span>
                    </div>
                    <button 
                      onClick={() => setUpgradeTemplate(item)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-xs hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>⚡</span> Claim 15% OFF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COHESIVE WORKSPACE TAB NAVIGATION */}
        <div className="flex gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/10 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-3 px-5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === 'all' ? 'bg-white/15 text-white border border-white/20' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Full Workspace View
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === 'templates' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,182,255,0.2)]' : 'text-gray-400 hover:text-white'}`}
          >
            <span>📦</span> Unlocked Templates ({filteredPurchases.length})
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === 'vault' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'text-gray-400 hover:text-white'}`}
          >
            <span>⭐</span> Knowledge Vault ({filteredBookmarks.length})
          </button>
          <button
            onClick={() => setActiveTab('sprints_support')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === 'sprints_support' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'text-gray-400 hover:text-white'}`}
          >
            <span>⚡</span> Consulting & Support ({filteredProjects.length})
          </button>
        </div>

        {/* 1. TOP ROW: UNLOCKED TEMPLATES & ASSETS */}
        {(activeTab === 'templates' || activeTab === 'all') && (
          <section className="mb-12 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                <span className="text-cyan-400">📦</span> Unlocked Templates & Digital Assets
              </h2>
              <Link to="/marketplace" className="text-xs font-bold text-cyan-400 hover:text-cyan-300">
                Explore Marketplace →
              </Link>
            </div>

            {filteredPurchases.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-3xl p-10 text-center bg-black/20">
                <p className="text-gray-400 text-sm mb-4 font-semibold">
                  {searchQuery ? `No templates matching "${searchQuery}".` : "You have not acquired any templates yet."}
                </p>
                <Link to="/marketplace" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 transition-all">
                  Browse Template Marketplace →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPurchases.map((purchase) => {
                  const targetProductId = purchase.product_id || purchase.template_id;
                  const product = products[targetProductId];
                  
                  const title = product ? product.title : (purchase.title || `Asset #${targetProductId || purchase.id}`);
                  const category = product ? product.category_name : "Template Package";
                  const isDownloading = downloadingId === targetProductId;

                  return (
                    <div key={purchase.id} className="bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 backdrop-blur-xl rounded-2xl p-6 transition-all group flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                            {category}
                          </span>
                          <button 
                            onClick={() => setActiveChangelog(product || { title, id: targetProductId })}
                            className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded hover:bg-emerald-500/20 cursor-pointer"
                            title="View release notes"
                          >
                            ✨ v2.4 Live Update
                          </button>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{title}</h3>
                        <p className="text-xs text-gray-400 font-mono">
                          Unlocked: {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                        <button
                          onClick={() => setActiveQuickStart(product || { title, id: targetProductId })}
                          className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-gray-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                          title="Open Quick-Start setup checklist & video demo"
                        >
                          <span>⚡</span> Quick Start
                        </button>
                        <button 
                          onClick={() => handleDownload(targetProductId)}
                          disabled={isDownloading}
                          className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-400 hover:text-black font-bold py-2 px-6 rounded-full transition-all text-xs whitespace-nowrap disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(56,182,255,0.1)] group-hover:shadow-[0_0_20px_rgba(56,182,255,0.3)]"
                        >
                          {isDownloading ? 'Decrypting...' : 'Secure Download'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* 2. MIDDLE ROW: KNOWLEDGE VAULT */}
        {(activeTab === 'vault' || activeTab === 'all') && (
          <section className="mb-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                  <span className="text-yellow-400">⭐</span> Knowledge Vault
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Your saved strategy articles, business guides, and reference materials.</p>
              </div>
              <Link to="/blog" className="text-xs font-bold text-cyan-400 hover:text-cyan-300">
                Browse All Blog Articles →
              </Link>
            </div>

            {filteredBookmarks.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-3xl p-8 text-center bg-black/20">
                <p className="text-gray-400 text-sm mb-2 font-semibold">
                  {searchQuery ? `No saved articles matching "${searchQuery}".` : "Your Knowledge Vault is empty."}
                </p>
                <p className="text-gray-500 text-xs mb-4 max-w-md mx-auto">
                  Bookmark key strategy articles while reading the OptiVoic blog to build your personal reference library!
                </p>
                <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 transition-all">
                  <span>📖</span> Explore Blog Articles →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookmarks.map((article) => (
                  <div key={article.slug} className="bg-white/[0.02] border border-white/10 hover:border-yellow-500/30 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between transition-all group">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                          {article.category || 'Business Strategy'}
                        </span>
                        <button 
                          onClick={() => handleRemoveBookmark(article)} 
                          className="text-xs text-gray-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                          title="Remove from saved guides"
                        >
                          ✕
                        </button>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-mono">
                        Saved {new Date(article.saved_at || Date.now()).toLocaleDateString()}
                      </span>
                      <Link 
                        to={`/blog/${article.slug}`} 
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        Read Guide →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 3. BOTTOM ROW: ACTIVE CONSULTING SPRINTS & PRIORITY TECHNICAL SUPPORT SIDE-BY-SIDE */}
        {(activeTab === 'sprints_support' || activeTab === 'all') && (
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT SIDE-BY-SIDE COLUMN: ACTIVE CONSULTING SPRINTS */}
              <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                      <span className="text-violet-400">⚡</span> Active Consulting Sprints
                    </h2>
                    <span className="text-xs text-gray-500 font-mono">({filteredProjects.length})</span>
                  </div>

                  {filteredProjects.length === 0 ? (
                    <div className="border border-dashed border-white/10 rounded-2xl p-6 text-center bg-black/20">
                      <p className="text-gray-400 text-xs mb-3 font-semibold">You have no active consulting engagements.</p>
                      <Link to="/consulting" className="text-violet-400 text-xs font-bold hover:underline">
                        Inquire about Agency Services →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredProjects.map((project) => (
                        <div key={project.id} className="bg-black/40 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                          <h3 className="text-base font-bold text-white mb-1">{project.project_name}</h3>
                          <p className="text-xs text-gray-400 mb-4">
                            Status: {project.status_step === 1 ? 'Discovery Phase' : project.status_step === 2 ? 'Active Build Phase' : 'Execution & Hand-off'}
                          </p>

                          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                            <div className={`p-2 rounded-xl border ${project.status_step >= 1 ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold' : 'border-white/10 text-gray-600'}`}>
                              1. Discovery
                            </div>
                            <div className={`p-2 rounded-xl border ${project.status_step >= 2 ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold' : 'border-white/10 text-gray-600'}`}>
                              2. Build
                            </div>
                            <div className={`p-2 rounded-xl border ${project.status_step >= 3 ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold' : 'border-white/10 text-gray-600'}`}>
                              3. Hand-off
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Need custom agency engineering?</span>
                  <Link to="/consulting" className="text-violet-400 font-bold hover:underline">
                    Book Discovery Call →
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDE-BY-SIDE COLUMN: PRIORITY TECHNICAL SUPPORT */}
              <div className="lg:col-span-5 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <h3 className="text-xl font-bold text-white">Priority Technical Support</h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Need help configuring Google Sheets formulas, tax write-off allocations, or multi-channel inventory imports? Request priority assistance directly from our team.
                  </p>
                  <ul className="text-xs text-gray-400 space-y-2 pt-1">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> Dedicated formula troubleshooting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> 1-on-1 setup assistance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✓</span> 2-hour priority email response window
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={() => setIsSupportOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 font-bold text-xs hover:bg-violet-500/30 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                >
                  <span>🚀</span> Request Technical Support Ticket
                </button>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* QUICK-START & WALKTHROUGH MODAL */}
      {activeQuickStart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-2xl bg-[#0D0D12] border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveQuickStart(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <span>⚡</span> Quick-Start Onboarding Hub
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white">{activeQuickStart.title}</h2>

            {/* Video Walkthrough Embed Preview */}
            <div className="rounded-2xl border border-white/15 bg-black overflow-hidden relative group">
              <div className="aspect-video w-full bg-gradient-to-tr from-cyan-900/30 via-violet-900/30 to-black flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-2xl shadow-[0_0_25px_rgba(56,182,255,0.6)] cursor-pointer group-hover:scale-110 transition-transform">
                  ▶
                </div>
                <h4 className="text-base font-bold text-white">Ease-of-Use & Benefits Video Overview</h4>
                <p className="text-xs text-gray-400 max-w-sm">Watch the 3-minute video walkthrough demonstrating automated formulas, setup tips, and live profit tracking.</p>
              </div>
            </div>

            {/* 4-Step Setup Checklist */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-white">Operational Setup Checklist</h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">01</span>
                  <div>
                    <h4 className="font-bold text-white">Download & Import File</h4>
                    <p className="text-gray-400 mt-0.5">Download the template package (.zip) and open the file in Google Sheets or Microsoft Excel.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">02</span>
                  <div>
                    <h4 className="font-bold text-white">Enable Automated Formulas</h4>
                    <p className="text-gray-400 mt-0.5">Ensure formula calculation mode is set to Automatic under Sheet Settings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">03</span>
                  <div>
                    <h4 className="font-bold text-white">Configure Base Categories & Tax Buckets</h4>
                    <p className="text-gray-400 mt-0.5">Enter your baseline platform fees (eBay, Shopify, Poshmark) or your state tax allocation percentage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded">04</span>
                  <div>
                    <h4 className="font-bold text-white">Begin Live Tracking</h4>
                    <p className="text-gray-400 mt-0.5">Log incoming sales or expenses — your net profit metrics and dashboard update in real-time!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
              <button 
                onClick={() => setActiveQuickStart(null)}
                className="px-6 py-2.5 rounded-full bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RELEASE NOTES CHANGELOG MODAL */}
      {activeChangelog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-[#0D0D12] border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5 text-left">
            <button 
              onClick={() => setActiveChangelog(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>✨</span> Version 2.4 Release Notes
            </div>

            <h2 className="text-2xl font-bold text-white">{activeChangelog.title}</h2>

            <div className="space-y-3 text-xs text-gray-300 bg-white/5 p-4 rounded-2xl border border-white/10">
              <h4 className="font-bold text-white text-sm border-b border-white/10 pb-2">What's New in v2.4:</h4>
              <ul className="list-disc list-inside space-y-1.5 leading-relaxed text-gray-300">
                <li><strong className="text-white">Updated 2026 Tax Table Buckets:</strong> Automated quarterly liquidity reservation.</li>
                <li><strong className="text-white">Enhanced Formula Speed:</strong> Optimized array formulas for 10,000+ row inventory spreadsheets.</li>
                <li><strong className="text-white">Multi-Marketplace Commission Deductions:</strong> Auto-deduct platform fees.</li>
              </ul>
            </div>

            <button 
              onClick={() => setActiveChangelog(null)}
              className="w-full py-3 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer"
            >
              Close Release Notes
            </button>
          </div>
        </div>
      )}

      {/* PRIORITY TECHNICAL SUPPORT MODAL */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-[#0D0D12] border border-violet-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 text-left">
            <button 
              onClick={() => setIsSupportOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
              <span>💬</span> Priority Technical Assistance
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">Request Formula or Technical Help</h2>
              <p className="text-xs text-gray-400 mt-1">Submit questions or request custom Google Sheets / Excel formula adjustments for your templates.</p>
            </div>

            {supportSent ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <span className="text-3xl">✅</span>
                <h4 className="text-base font-bold text-emerald-400">Support Ticket Submitted!</h4>
                <p className="text-xs text-gray-300">An OptiVoic technical specialist will review your request and reply to <strong className="text-white">{user?.email}</strong> within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSendSupport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">User Email</label>
                  <input 
                    type="email" 
                    disabled 
                    value={user?.email || ''} 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">How can we assist you?</label>
                  <textarea 
                    required 
                    rows={4}
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Describe your formula question, spreadsheet setup needs, or technical support inquiry..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-violet-400"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold text-xs hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all cursor-pointer"
                  >
                    🚀 Submit Priority Support Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL WITH PROMO CODE FOR UPGRADES */}
      {upgradeTemplate && (
        <CheckoutModal 
          isOpen={!!upgradeTemplate}
          onClose={() => setUpgradeTemplate(null)}
          template={upgradeTemplate}
          user={user}
          initialPromoCode="PORTAL15"
          onSuccess={() => {
            alert("Upgrade acquired successfully!");
            setUpgradeTemplate(null);
          }}
        />
      )}
    </div>
  );
}
