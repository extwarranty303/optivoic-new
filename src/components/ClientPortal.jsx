import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Footer from './Footer';

// --- FALLBACK PRODUCT DATABASE ---
// This acts as a safety net in case the products table isn't fully populated yet
const TEMPLATES_DB = {
  "executive-tax-engine": { category: "Essential Business Tools", title: "Executive Tax Engine" },
  1: { category: "Essential Trackers", title: "E-Commerce Reseller Profit & COGS Tracker" },
  2: { category: "Essential Trackers", title: "Options Trading & Premium Journal" },
  3: { category: "Essential Trackers", title: "The 'Story Bible' for Fiction" },
  4: { category: "Essential Trackers", title: "Collectibles Portfolio Valuation Tracker" },
  5: { category: "Essential Trackers", title: "Digital Nomad Route Planner" },
  6: { category: "Professional Hubs", title: "AI Prompt Testing Sandbox" }
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export default function ClientPortal() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const [projects, setProjects] = useState([]); 
  const [dynamicProducts, setDynamicProducts] = useState({}); // NEW: Holds live DB products
  const [downloadingId, setDownloadingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
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

      // 2. Fetch User's Purchases
      const { data: userPurchases } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (userPurchases) setPurchases(userPurchases);

      // 3. Fetch Live Products to map to purchases
      const { data: prodData } = await supabase.from('products').select('id, title');
      if (prodData) {
        const prodMap = {};
        prodData.forEach(p => { prodMap[p.id] = p; });
        setDynamicProducts(prodMap);
      }

      // 4. SECURE CHECK: Is user in the admins table?
      const { data: adminData } = await supabase
        .from('admins')
        .select('email')
        .eq('email', session.user.email)
        .maybeSingle();
        
      if (adminData) setIsAdmin(true);

      // 5. Fetch User's Consulting Projects
      const { data: userProjects } = await supabase
        .from('projects')
        .select('*')
        .eq('client_email', session.user.email)
        .order('created_at', { ascending: false });

      if (userProjects) setProjects(userProjects);

      setLoading(false);
    };

    fetchPortalData();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // UPDATED: The Smart Entitlement Download Engine
  const handleDownload = async (templateId) => {
    setDownloadingId(templateId);
    try {
      // Step 1: Look up the product to find the current active file ID
      const { data: product, error: prodError } = await supabase
        .from('products')
        .select('current_file_id')
        .eq('id', templateId)
        .single();

      if (prodError || !product?.current_file_id) {
        throw new Error("No active file is currently linked to this product. Contact support.");
      }

      // Step 2: Grab the storage path and original filename from the files table
      const { data: fileMeta, error: fileError } = await supabase
        .from('files')
        .select('storage_path, original_filename')
        .eq('id', product.current_file_id)
        .single();

      if (fileError || !fileMeta) {
        throw new Error("File metadata missing.");
      }

      // Step 3: Generate Signed URL and FORCE the download name
      const { data: signedData, error: signError } = await supabase.storage
        .from('templates') 
        .createSignedUrl(fileMeta.storage_path, 60, {
          download: fileMeta.original_filename // <-- THIS IS THE MAGIC BULLET
        });

      if (signError) throw signError;

      // Step 4: Execute the download cleanly in the browser
      const link = document.createElement('a');
      link.href = signedData.signedUrl;
      link.setAttribute('download', fileMeta.original_filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      alert(`Download failed: ${error.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center text-cyan-400 font-bold animate-pulse tracking-widest uppercase">Decrypting Portal...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      <NoiseOverlay />
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-5 px-8 flex justify-between items-center bg-black/50 backdrop-blur-2xl">
        <Link to="/" className="text-xl font-black text-white tracking-tighter drop-shadow-lg hover:opacity-80 transition-opacity cursor-pointer">
          OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span> <span className="text-gray-500 font-medium ml-2 text-sm hidden sm:inline-block">| Client Portal</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          
          <nav className="flex gap-4 mr-4">
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
            Home
          </Link>
        </nav>

          {isAdmin && (
            <Link 
              to="/admin" 
              className="hidden sm:flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-bold px-3 py-1.5 rounded transition-all tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Admin Panel
            </Link>
          )}

          <span className="text-sm text-gray-400 font-mono hidden md:block">{user?.email}</span>
          
          <button 
            onClick={handleSignOut}
            className="text-sm font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest ml-2"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-black mb-2">Welcome Back.</h1>
          <p className="text-gray-400 text-lg">Manage your digital frameworks and active consulting engagements.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: Dynamic Digital Downloads */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-6">
              <span className="text-cyan-400">↓</span> Purchased Frameworks
            </h2>

            {purchases.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-3xl p-10 text-center bg-black/20">
                <p className="text-gray-500 text-sm mb-4">You have not acquired any frameworks yet.</p>
                <Link to="/" className="text-cyan-400 text-sm font-bold hover:underline">
                  Browse the Digital Marketplace →
                </Link>
              </div>
            ) : (
              purchases.map((purchase) => {
                // Dynamically pull title from DB, fallback to local DB if not found
                const dbProduct = dynamicProducts[purchase.template_id];
                const fallbackProduct = TEMPLATES_DB[purchase.template_id];
                
                const title = dbProduct ? dbProduct.title : (fallbackProduct ? fallbackProduct.title : `Asset #${purchase.template_id}`);
                const category = fallbackProduct ? fallbackProduct.category : "Digital Asset";
                
                const isDownloading = downloadingId === purchase.template_id;

                return (
                  <div key={purchase.id} className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl p-6 hover:bg-white/[0.04] transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 block mb-1">
                          {category}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                        <p className="text-xs text-gray-400 font-mono">
                          Acquired: {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDownload(purchase.template_id)}
                        disabled={isDownloading}
                        className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-400 hover:text-black font-bold py-3 px-8 rounded-full transition-all text-sm whitespace-nowrap disabled:opacity-50 shadow-[0_0_15px_rgba(56,182,255,0.1)] group-hover:shadow-[0_0_20px_rgba(56,182,255,0.3)]"
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
              <span className="text-violet-400">⚡</span> Active Engagements
            </h2>

            {projects.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-3xl p-10 text-center bg-black/20">
                <p className="text-gray-500 text-sm mb-4">You have no active consulting sprints.</p>
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
      </main>
      
    </div>
  );
}