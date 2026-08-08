import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { fetchBookmarks, toggleBookmark } from '../utils/bookmarkManager';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [projects, setProjects] = useState([]); 
  const [products, setProducts] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [savedArticles, setSavedArticles] = useState([]);
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
    } fontFinally: {
      setDownloadingId(null);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center text-cyan-400 font-bold animate-pulse tracking-widest uppercase">Decrypting OptiVoic Portal...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      <NoiseOverlay />
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-5 px-8 flex justify-between items-center bg-black/50 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white tracking-tight">
            OptiVoic Portal
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            User Workspace
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
                Admin Command Center
              </Link>
              <Link 
                to="/blog-admin" 
                className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 text-xs font-bold px-3 py-1.5 rounded transition-all tracking-widest uppercase"
              >
                Blog Admin
              </Link>
            </div>
          )}

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

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            OPTIVOIC PORTAL
          </div>
          <h1 className="text-4xl font-black mb-2">Welcome Back.</h1>
          <p className="text-gray-400 text-lg">Manage your unlocked templates, saved intelligence guides, and active consulting engagements.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Dynamic Digital Downloads */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="text-cyan-400">↓</span> Unlocked Templates & Assets
            </h2>

            {purchases.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-3xl p-10 text-center bg-black/20">
                <p className="text-gray-500 text-sm mb-4">You have not acquired any templates yet.</p>
                <Link to="/marketplace" className="text-cyan-400 text-sm font-bold hover:underline">
                  Browse Template Marketplace →
                </Link>
              </div>
            ) : (
              purchases.map((purchase) => {
                const targetProductId = purchase.product_id || purchase.template_id;
                const product = products[targetProductId];
                
                const title = product ? product.title : (purchase.title || `Asset #${targetProductId || purchase.id}`);
                const category = product ? product.category_name : "Template Package";
                
                const isDownloading = downloadingId === targetProductId;

                return (
                  <div key={purchase.id} className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/[0.04] transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1">
                          {category}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                        <p className="text-xs text-gray-400 font-mono">
                          Unlocked: {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDownload(targetProductId)}
                        disabled={isDownloading}
                        className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-full transition-all text-sm whitespace-nowrap disabled:opacity-50 shadow-[0_0_15px_rgba(56,182,255,0.1)] group-hover:shadow-[0_0_20px_rgba(56,182,255,0.3)] cursor-pointer"
                      >
                        {isDownloading ? 'Decrypting...' : 'Secure Download'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT: Dynamic CRM Consulting Tracker */}
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="text-violet-400">⚡</span> Active Consulting Sprints
            </h2>

            {projects.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-3xl p-10 text-center bg-black/20">
                <p className="text-gray-500 text-sm mb-4">You have no active consulting engagements.</p>
                <Link to="/consulting" className="text-violet-400 text-sm font-bold hover:underline">
                  Inquire about Agency Services →
                </Link>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden shadow-xl mb-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[40px]"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2">{project.project_name}</h3>
                    <p className="text-sm text-gray-400 mb-8">
                      Status: {project.status_step === 1 ? 'Discovery Phase' : project.status_step === 2 ? 'Active Build Phase' : 'Execution & Hand-off'}
                    </p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${project.status_step >= 1 ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(56,182,255,0.5)]' : 'border-2 border-white/10 bg-black text-transparent'}`}>✓</div>
                        <span className={`text-sm font-bold ${project.status_step >= 1 ? 'text-white' : 'text-gray-600'}`}>1. Discovery Audit</span>
                      </div>
                      
                      <div className="flex items-center gap-4 relative">
                        <div className={`absolute left-3 top-[-30px] w-[2px] h-[35px] ${project.status_step >= 2 ? 'bg-cyan-400/50' : 'bg-white/10'}`}></div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${project.status_step >= 2 ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(56,182,255,0.5)]' : 'border-2 border-white/10 bg-black text-transparent'}`}>✓</div>
                        <span className={`text-sm font-bold ${project.status_step >= 2 ? 'text-white' : 'text-gray-600'}`}>2. Technical Architecture</span>
                      </div>

                      <div className="flex items-center gap-4 relative">
                        <div className={`absolute left-3 top-[-30px] w-[2px] h-[35px] ${project.status_step >= 3 ? 'bg-cyan-400/50' : 'bg-white/10'}`}></div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${project.status_step >= 3 ? 'bg-cyan-400 text-black shadow-[0_0_10px_rgba(56,182,255,0.5)]' : 'border-2 border-white/10 bg-black text-transparent'}`}>✓</div>
                        <span className={`text-sm font-bold ${project.status_step >= 3 ? 'text-white' : 'text-gray-600'}`}>3. Execution & Hand-off</span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10">
                      <a href="mailto:consulting@optivoic.com" className="text-sm text-gray-400 hover:text-white transition-colors flex justify-between items-center w-full font-medium">
                        <span>Contact Project Manager</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* KNOWLEDGE VAULT */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                <span className="text-yellow-400">⭐</span> Knowledge Vault
              </h2>
              <p className="text-xs text-gray-400 mt-1">Your bookmarked strategy articles, business guides, and reference materials.</p>
            </div>
            <Link to="/blog" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              Browse All Blog Articles →
            </Link>
          </div>

          {savedArticles.length === 0 ? (
            <div className="border border-dashed border-white/10 rounded-3xl p-8 text-center bg-black/20">
              <p className="text-gray-400 text-sm mb-2 font-semibold">Your Knowledge Vault is empty.</p>
              <p className="text-gray-500 text-xs mb-5 max-w-md mx-auto">
                Bookmark key strategy articles while reading the OptiVoic blog to build your personal reference library!
              </p>
              <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-500/20 transition-all">
                <span>📖</span> Explore Blog Articles →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArticles.map((article) => (
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
        </div>
      </main>
    </div>
  );
}
