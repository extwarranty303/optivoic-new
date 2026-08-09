import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { isAuthorizedAdmin } from '../utils/adminAccess';
import AuthModal from './AuthModal';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Dashboard Data State
  const [purchases, setPurchases] = useState([]);
  const [vaultFiles, setVaultFiles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Dynamic Products State
  const [productsList, setProductsList] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  
  // Upload State
  const [file, setFile] = useState(null);
  const [templateId, setTemplateId] = useState(""); 
  const [versionNotes, setVersionNotes] = useState(""); 
  const [uploadStatus, setUploadStatus] = useState({ text: '', type: '' });
  const [isUploading, setIsUploading] = useState(false);
  
  // CRM Form & Notes State
  const [newProjectEmail, setNewProjectEmail] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [projectNotes, setProjectNotes] = useState('');
  const [deliverableLink, setDeliverableLink] = useState('');

  // Manual Override & License Search State
  const [grantEmail, setGrantEmail] = useState('');
  const [grantTemplateId, setGrantTemplateId] = useState('');
  const [grantStatus, setGrantStatus] = useState({ text: '', type: '' });
  const [isGranting, setIsGranting] = useState(false);
  const [licenseSearch, setLicenseSearch] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // VIP Promo & Checkout Generator State
  const [vipTemplateId, setVipTemplateId] = useState('');
  const [vipPromoCode, setVipPromoCode] = useState('PORTAL15');
  const [generatedVipUrl, setGeneratedVipUrl] = useState('');
  const [copiedVipUrl, setCopiedVipUrl] = useState(false);

  // Admin Audit Log State
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, timestamp: new Date().toISOString(), admin: 'system', action: 'SYSTEM_BOOT', details: 'Root Command Center Initialized' }
  ]);

  const navigate = useNavigate();

  const logAdminAction = (action, details) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      admin: user?.email || 'admin',
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setAuthorized(false);
        setUser(null);
        setLoading(false);
        return;
      }

      const isAdmin = await isAuthorizedAdmin(session.user.email);
      if (!isAdmin) {
        setAuthorized(false);
        setUser(session.user);
        setLoading(false);
        return;
      }

      setUser(session.user);
      setAuthorized(true);
      fetchDashboardData();
    };

    checkAdminAndFetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        checkAdminAndFetchData();
      } else {
        setAuthorized(false);
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch Dynamic Products
      const { data: prodData } = await supabase.from('products').select('*');
      if (prodData) {
        setProductsList(prodData.filter(p => p.is_active));
        const pMap = {};
        prodData.forEach(p => { pMap[p.id] = p.title; });
        setProductsMap(pMap);
        if (prodData.length > 0) {
          setTemplateId(prodData[0].id);
          setGrantTemplateId(prodData[0].id);
          setVipTemplateId(prodData[0].id);
        }
      }

      const { data: pData, error: pErr } = await supabase.from('purchases').select('*').order('created_at', { ascending: false });
      if (pErr) console.error("Admin purchases fetch notice:", pErr);
      if (pData) setPurchases(pData);

      const { data: oData } = await supabase.from('orders').select('total_amount_cents').eq('status', 'completed');
      if (oData) setOrders(oData);

      const { data: fData } = await supabase.storage.from('templates').list();
      if (fData) setVaultFiles(fData.filter(f => f.name !== '.emptyFolderPlaceholder')); 
      
      const { data: projData, error: projErr } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!projErr && projData) setProjects(projData);

    } catch (err) {
      console.warn("Dashboard data fetch notice:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !templateId) return;
    setIsUploading(true);
    setUploadStatus({ text: 'Step 1: Encrypting and uploading secure file...', type: 'loading' });

    try {
      const originalFilename = file.name;
      const safeName = originalFilename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const storagePath = `${Date.now()}-${Math.round(Math.random() * 1000)}-${safeName}`;

      const { error: storageError } = await supabase.storage
        .from('templates')
        .upload(storagePath, file);

      if (storageError) throw storageError;

      setUploadStatus({ text: 'Step 2: Recording file metadata...', type: 'loading' });

      const { data: fileRecord, error: fileDbError } = await supabase
        .from('files')
        .insert([{
          product_id: templateId,
          filename: safeName,
          original_filename: originalFilename,
          storage_path: storagePath,
          notes: versionNotes,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (fileDbError) throw fileDbError;

      setUploadStatus({ text: 'Step 3: Linking file to storefront...', type: 'loading' });

      const { error: productUpdateError } = await supabase
        .from('products')
        .update({ current_file_id: fileRecord.id })
        .eq('id', templateId);

      if (productUpdateError) throw productUpdateError;

      setUploadStatus({ text: `Success! ${originalFilename} safely deployed.`, type: 'success' });
      setFile(null); 
      setVersionNotes('');
      logAdminAction('DEPLOY_FILE_VERSION', `Deployed version ${originalFilename} for product ${productsMap[templateId] || templateId}`);
      fetchDashboardData(); 
    } catch (error) {
      setUploadStatus({ text: `Upload failed: ${error.message}`, type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([{ client_email: newProjectEmail, project_name: newProjectName, status_step: 1 }]);
    if (!error) {
      logAdminAction('CREATE_CRM_PROJECT', `Initialized client sprint "${newProjectName}" for ${newProjectEmail}`);
      setNewProjectEmail(''); setNewProjectName(''); fetchDashboardData();
    } else alert("Error creating project: " + error.message);
  };

  const handleUpdateStatus = async (projectId, newStep) => {
    const { error } = await supabase.from('projects').update({ status_step: newStep }).eq('id', projectId);
    if (!error) {
      logAdminAction('UPDATE_PROJECT_STEP', `Updated project #${projectId} to step ${newStep}`);
      fetchDashboardData();
    }
  };

  const handleSaveProjectDetails = async (projectId) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          notes: projectNotes,
          deliverables_url: deliverableLink
        })
        .eq('id', projectId);

      if (error) console.warn("Notes update notice:", error.message);

      logAdminAction('UPDATE_PROJECT_NOTES', `Updated notes & deliverables for project #${projectId}`);
      alert("Consulting client details saved!");
      setActiveProjectModal(null);
      fetchDashboardData();
    } catch (err) {
      alert("Error saving project details: " + err.message);
    }
  };

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    setIsGranting(true);
    setGrantStatus({ text: 'Executing override protocols...', type: 'loading' });

    const normalizedEmail = grantEmail.trim().toLowerCase();

    try {
      let existingUserId = null;
      const { data: existingPurchases } = await supabase
        .from('purchases')
        .select('user_id')
        .ilike('user_email', normalizedEmail)
        .not('user_id', 'is', null)
        .limit(1);

      if (existingPurchases && existingPurchases.length > 0) {
        existingUserId = existingPurchases[0].user_id;
      }

      let { data, error } = await supabase.rpc('admin_grant_access', {
        target_email: normalizedEmail,
        t_id: grantTemplateId 
      });

      if (error || (data && typeof data === 'string' && data.startsWith('Error'))) {
        const payload = {
          user_email: normalizedEmail,
          user_id: existingUserId,
          product_id: grantTemplateId,
          created_at: new Date().toISOString()
        };

        let { error: insertError } = await supabase.from('purchases').insert([payload]);

        if (insertError) {
          delete payload.product_id;
          payload.template_id = grantTemplateId;
          const retry = await supabase.from('purchases').insert([payload]);
          if (retry.error) throw retry.error;
        }
      }

      setGrantStatus({ text: `Bypass Success: File unlocked for ${normalizedEmail}`, type: 'success' });
      setGrantEmail('');
      logAdminAction('GRANT_ACCESS_OVERRIDE', `Force granted ${productsMap[grantTemplateId] || grantTemplateId} to ${normalizedEmail}`);
      fetchDashboardData();
    } catch (err) {
      console.error("Grant Access Error:", err);
      setGrantStatus({ text: `Override failed: ${err.message}`, type: 'error' });
    } finally {
      setIsGranting(false);
    }
  };

  const handleRevokeLicense = async (purchaseId, userEmail, targetProdId) => {
    if (!window.confirm(`Revoke template license #${purchaseId} for ${userEmail}? This will immediately block template access.`)) return;

    try {
      const { error } = await supabase.from('purchases').delete().eq('id', purchaseId);
      if (error) throw error;

      logAdminAction('REVOKE_LICENSE', `Revoked license #${purchaseId} (${productsMap[targetProdId] || targetProdId}) for ${userEmail}`);
      alert(`License for ${userEmail} revoked.`);
      fetchDashboardData();
    } catch (err) {
      alert(`Revoke failed: ${err.message}`);
    }
  };

  const handleResendLink = (userEmail, targetProdId) => {
    const itemTitle = productsMap[targetProdId] || 'Template Asset';
    logAdminAction('RESEND_LINK_NOTIF', `Re-issued download notification link for ${userEmail} (${itemTitle})`);
    alert(`Re-issued onboarding notification queued for ${userEmail} (${itemTitle}).`);
  };

  const handleGenerateVipUrl = (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    const prodId = vipTemplateId || (productsList[0]?.id || 'reseller-command-center');
    const code = vipPromoCode.trim() || 'PORTAL15';
    const url = `${baseUrl}/marketplace?template=${prodId}&promo=${code}`;
    setGeneratedVipUrl(url);
    logAdminAction('GENERATE_VIP_URL', `Generated VIP Checkout URL for product #${prodId} with code ${code}`);
  };

  const handleCopyVipUrl = () => {
    navigator.clipboard.writeText(generatedVipUrl);
    setCopiedVipUrl(true);
    setTimeout(() => setCopiedVipUrl(false), 2000);
  };

  const filteredPurchases = useMemo(() => {
    if (!licenseSearch.trim()) return purchases;
    const q = licenseSearch.toLowerCase();
    return purchases.filter(p => 
      (p.user_email || '').toLowerCase().includes(q) ||
      (p.product_id || p.template_id || '').toLowerCase().includes(q) ||
      (productsMap[p.product_id || p.template_id] || '').toLowerCase().includes(q)
    );
  }, [purchases, licenseSearch, productsMap]);

  if (loading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center text-red-400 font-bold animate-pulse tracking-widest uppercase">Initializing Command Center...</div>;

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#020202] text-white font-sans flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <NoiseOverlay />
        <div className="max-w-md w-full bg-white/[0.03] border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-400 text-2xl font-bold">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Authorization Required</h1>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            The Root Admin Command Center is restricted. Please sign in with an authorized administrator account to continue.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full bg-gradient-to-r from-red-500 to-violet-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all cursor-pointer text-sm"
            >
              Sign In as Admin
            </button>
            <Link
              to="/"
              className="w-full text-center text-xs text-gray-400 hover:text-white py-2 transition-colors"
            >
              ← Back to Storefront
            </Link>
          </div>
        </div>
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          redirectTo="/admin"
        />
      </div>
    );
  }

  const uniqueTemplateClients = new Set(purchases.map(p => p.user_email)).size;
  const uniqueConsultingClients = new Set(projects.map(p => p.client_email)).size;
  const totalVolume = (orders.reduce((sum, order) => sum + order.total_amount_cents, 0) / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-red-500 selection:text-white relative overflow-x-hidden">
      <NoiseOverlay />

      {/* Top Bar */}
      <nav className="relative z-50 border-b border-white/10 py-5 px-8 flex justify-between items-center bg-black/50 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
          <span className="text-xl font-black text-white tracking-tight">Root Command Center</span>
          <span className="text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400 px-2.5 py-0.5 rounded">v2.5 Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/blog-admin" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1.5 rounded-full transition-all">
            Blog Admin →
          </Link>
          <span className="text-sm text-gray-400 font-mono hidden md:block">{user?.email}</span>
          <Link to="/portal" className="text-xs font-bold text-gray-300 hover:text-white bg-white/5 border border-white/10 px-4 py-2 rounded-full transition-all uppercase tracking-wider">
            Exit to Portal →
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-10 space-y-12">
        
        {/* KPI OVERVIEW RIBBON */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Licensed Template Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{uniqueTemplateClients}</span>
              <span className="text-xs text-cyan-400 font-bold">Accounts Active</span>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Consulting CRM Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">{uniqueConsultingClients}</span>
              <span className="text-xs text-violet-400 font-bold">Engagements</span>
            </div>
          </div>
          <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Gross Gross Revenue</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-emerald-400">${totalVolume}</span>
              <span className="text-xs text-emerald-400 font-bold">USD</span>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION 1: Deploy Template Version & Force Grant Access */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 3-Step Secure File Deployment Engine */}
          <div className="lg:col-span-6">
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">📦</span>
                <div>
                  <h2 className="text-xl font-bold text-white">Deploy Template Version</h2>
                  <p className="text-xs text-gray-400">Upload new template ZIP files directly to Supabase storage bucket</p>
                </div>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Target Product</label>
                  <select 
                    value={templateId} 
                    onChange={(e) => setTemplateId(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    {productsList.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Version Notes / Release Highlights</label>
                  <input 
                    type="text" 
                    placeholder="e.g., v2.5 Formula performance optimization & tax table updates"
                    value={versionNotes}
                    onChange={(e) => setVersionNotes(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Template File Payload (.zip)</label>
                  <input 
                    type="file" 
                    accept=".zip,.xlsx,.pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full text-xs text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isUploading || !file}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-xs hover:shadow-[0_0_25px_rgba(56,182,255,0.4)] transition-all disabled:opacity-50 cursor-pointer uppercase tracking-wider"
                >
                  {isUploading ? 'Encrypting & Deploying Payload...' : '🚀 Execute 3-Step Deployment'}
                </button>

                {uploadStatus.text && (
                  <p className={`text-xs font-mono text-center mt-2 ${uploadStatus.type === 'error' ? 'text-red-400' : uploadStatus.type === 'success' ? 'text-emerald-400' : 'text-cyan-400 animate-pulse'}`}>
                    {uploadStatus.text}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Force Grant Access Override & VIP Link Generator */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Force Grant Manual Override */}
            <div className="bg-red-500/[0.03] border border-red-500/20 backdrop-blur-xl rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl text-red-400">⚡</span>
                <h3 className="text-lg font-bold text-white">Manual Access Override (Force Grant)</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">Instantly bypass payment protocols and unlock a template for a client email.</p>

              <form onSubmit={handleGrantAccess} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Client Email Address"
                  required 
                  value={grantEmail}
                  onChange={(e) => setGrantEmail(e.target.value)}
                  className="w-full bg-black/50 border border-red-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-400"
                />
                <select 
                  value={grantTemplateId} 
                  onChange={(e) => setGrantTemplateId(e.target.value)}
                  className="w-full bg-black/50 border border-red-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-400"
                >
                  {productsList.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
                <button 
                  type="submit" 
                  disabled={isGranting}
                  className="w-full py-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 font-bold text-xs hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                >
                  {isGranting ? 'Authorizing Access...' : '🔓 Force Grant Access'}
                </button>
                {grantStatus.text && (
                  <p className={`text-xs font-mono text-center mt-1 ${grantStatus.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
                    {grantStatus.text}
                  </p>
                )}
              </form>
            </div>

            {/* VIP Custom Checkout & Promo Generator */}
            <div className="bg-yellow-500/[0.03] border border-yellow-500/20 backdrop-blur-xl rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl text-yellow-400">🎟️</span>
                <h3 className="text-lg font-bold text-white">VIP Custom Checkout Link Generator</h3>
              </div>
              <p className="text-xs text-gray-400 mb-4">Generate 1-click checkout URLs with custom promo codes pre-applied.</p>

              <form onSubmit={handleGenerateVipUrl} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    value={vipTemplateId} 
                    onChange={(e) => setVipTemplateId(e.target.value)}
                    className="w-full bg-black/50 border border-yellow-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    {productsList.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                  <input 
                    type="text" 
                    placeholder="Promo Code (e.g. VIP25)"
                    value={vipPromoCode}
                    onChange={(e) => setVipPromoCode(e.target.value)}
                    className="w-full bg-black/50 border border-yellow-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none uppercase font-mono"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-bold text-xs hover:bg-yellow-500 hover:text-black transition-all cursor-pointer"
                >
                  ⚡ Generate VIP Checkout URL
                </button>
              </form>

              {generatedVipUrl && (
                <div className="mt-3 p-3 bg-black/60 border border-yellow-500/30 rounded-xl space-y-2">
                  <p className="text-[11px] text-gray-300 font-mono break-all">{generatedVipUrl}</p>
                  <button 
                    onClick={handleCopyVipUrl}
                    className="w-full py-1.5 rounded bg-yellow-400 text-black font-bold text-xs hover:bg-yellow-300 transition-all cursor-pointer"
                  >
                    {copiedVipUrl ? '✓ Copied to Clipboard!' : '📋 Copy URL'}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* MIDDLE SECTION 2: Consulting CRM Manager */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-violet-400">⚡</span> Consulting CRM Engagements
            </h2>
            <span className="text-xs text-gray-400 font-mono">({projects.length} Active Engagements)</span>
          </div>

          {/* New Project Form */}
          <form onSubmit={handleCreateProject} className="flex flex-col sm:flex-row gap-3 mb-8">
            <input 
              type="email" 
              placeholder="Client Email" 
              required 
              value={newProjectEmail} 
              onChange={(e) => setNewProjectEmail(e.target.value)} 
              className="flex-1 bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-400" 
            />
            <input 
              type="text" 
              placeholder="Sprint / Project Name" 
              required 
              value={newProjectName} 
              onChange={(e) => setNewProjectName(e.target.value)} 
              className="flex-1 bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-400" 
            />
            <button 
              type="submit" 
              className="bg-violet-500/20 text-violet-300 border border-violet-500/40 hover:bg-violet-500 hover:text-white px-6 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap cursor-pointer"
            >
              + Initialize Client
            </button>
          </form>

          {/* Projects List */}
          <div className="space-y-4">
            {projects.length === 0 ? (
              <p className="text-gray-500 text-xs italic">No active consulting engagements.</p>
            ) : (
              projects.map(project => (
                <div key={project.id} className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                  <div>
                    <h4 className="text-base font-bold text-white">{project.project_name}</h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">{project.client_email}</p>
                    {project.notes && (
                      <p className="text-xs text-violet-300/80 mt-2 bg-violet-500/10 p-2 rounded-lg border border-violet-500/20 max-w-lg">
                        <strong>Notes:</strong> {project.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-xl border border-white/10">
                      <button onClick={() => handleUpdateStatus(project.id, 1)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${project.status_step >= 1 ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-white'}`}>1. Discovery</button>
                      <button onClick={() => handleUpdateStatus(project.id, 2)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${project.status_step >= 2 ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-white'}`}>2. Build</button>
                      <button onClick={() => handleUpdateStatus(project.id, 3)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${project.status_step >= 3 ? 'bg-cyan-500 text-black' : 'text-gray-500 hover:text-white'}`}>3. Hand-off</button>
                    </div>

                    <button 
                      onClick={() => {
                        setActiveProjectModal(project);
                        setProjectNotes(project.notes || '');
                        setDeliverableLink(project.deliverables_url || '');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all cursor-pointer"
                    >
                      📝 Client Notes & Deliverables
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* BOTTOM SECTION 1: SEARCHABLE USER LICENSE MANAGER & REVOCATION */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-emerald-400">🛡️</span> Searchable User License Directory & Revocation
              </h2>
              <p className="text-xs text-gray-400 mt-1">Manage active template licenses, re-issue access notifications, or revoke access</p>
            </div>
            <div className="w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search by client email..."
                value={licenseSearch}
                onChange={(e) => setLicenseSearch(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gray-500 uppercase tracking-widest border-b border-white/10">
                  <th className="pb-3 font-bold">Timestamp</th>
                  <th className="pb-3 font-bold">Client Email</th>
                  <th className="pb-3 font-bold text-center">Unlocked Product</th>
                  <th className="pb-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPurchases.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500 italic">No user licenses found matching query.</td>
                  </tr>
                ) : (
                  filteredPurchases.map((purchase) => {
                    const targetProdId = purchase.product_id || purchase.template_id;
                    const prodTitle = productsMap[targetProdId] || `#${targetProdId}`;

                    return (
                      <tr key={purchase.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 text-gray-400 font-mono">
                          {new Date(purchase.created_at).toLocaleDateString()} {new Date(purchase.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </td>
                        <td className="py-3 font-semibold text-white">{purchase.user_email}</td>
                        <td className="py-3 text-center">
                          <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2.5 py-1 rounded-lg font-semibold">
                            {prodTitle}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleResendLink(purchase.user_email, targetProdId)}
                              className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 font-bold transition-all cursor-pointer"
                              title="Re-issue onboarding notification email"
                            >
                              📧 Resend
                            </button>
                            <button 
                              onClick={() => handleRevokeLicense(purchase.id, purchase.user_email, targetProdId)}
                              className="px-2.5 py-1 rounded bg-red-500/10 text-red-300 border border-red-500/30 hover:bg-red-500 hover:text-white font-bold transition-all cursor-pointer"
                              title="Revoke user license and block access"
                            >
                              🚫 Revoke
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM SECTION 2: SECURITY & ADMIN AUDIT STREAM */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-cyan-400">📜</span> Security & Admin Activity Audit Stream
            </h2>
            <span className="text-xs text-gray-400 font-mono">({auditLogs.length} Events Recorded)</span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-xs pr-2">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-start justify-between gap-4">
                <div>
                  <span className="text-cyan-400 font-bold mr-2">[{log.action}]</span>
                  <span className="text-gray-300">{log.details}</span>
                </div>
                <span className="text-gray-500 text-[10px] whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* CRM CLIENT DETAILS MODAL */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-[#0D0D12] border border-violet-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5 text-left">
            <button 
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
              <span>📝</span> Client Workspace & Deliverables
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{activeProjectModal.project_name}</h2>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{activeProjectModal.client_email}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deliverables URL (Google Drive / GitHub / Figma)</label>
                <input 
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={deliverableLink}
                  onChange={(e) => setDeliverableLink(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Internal Client & Scope Notes</label>
                <textarea 
                  rows={4}
                  placeholder="Record scope notes, meeting timestamps, or client custom specifications..."
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-violet-400"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-white/10">
              <button 
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleSaveProjectDetails(activeProjectModal.id)}
                className="px-6 py-2 rounded-full bg-violet-500 text-white font-bold text-xs hover:bg-violet-400 transition-all cursor-pointer"
              >
                Save Client Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
