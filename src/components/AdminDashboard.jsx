import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Footer from './Footer';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Dashboard Data State
  const [purchases, setPurchases] = useState([]);
  const [vaultFiles, setVaultFiles] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // NEW: Dynamic Products State
  const [productsList, setProductsList] = useState([]);
  
  // Upload State
  const [file, setFile] = useState(null);
  const [templateId, setTemplateId] = useState(""); 
  const [versionNotes, setVersionNotes] = useState(""); // NEW: Version tracking
  const [uploadStatus, setUploadStatus] = useState({ text: '', type: '' });
  const [isUploading, setIsUploading] = useState(false);
  
  // CRM Form State
  const [newProjectEmail, setNewProjectEmail] = useState('');
  const [newProjectName, setNewProjectName] = useState('');

  // Manual Override State
  const [grantEmail, setGrantEmail] = useState('');
  const [grantTemplateId, setGrantTemplateId] = useState('');
  const [grantStatus, setGrantStatus] = useState({ text: '', type: '' });
  const [isGranting, setIsGranting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/'); 
        return;
      } 
      
      // SECURE CHECK: Is this email dynamically on the VIP list in the database?
      const { data: adminData } = await supabase
        .from('admins')
        .select('email')
        .eq('email', session.user.email)
        .maybeSingle();

      if (!adminData) {
        navigate('/portal'); 
        return;
      }

      setUser(session.user);
      fetchDashboardData();
    };
    checkAdminAndFetchData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    // Fetch Dynamic Products
    const { data: prodData } = await supabase.from('products').select('id, title').eq('is_active', true);
    if (prodData) {
      setProductsList(prodData);
      if (prodData.length > 0) {
        setTemplateId(prodData[0].id);
        setGrantTemplateId(prodData[0].id);
      }
    }

    const { data: pData } = await supabase.from('purchases').select('*').order('created_at', { ascending: false });
    if (pData) setPurchases(pData);

    // Assuming you are keeping the bucket named 'templates'
    const { data: fData } = await supabase.storage.from('templates').list();
    if (fData) setVaultFiles(fData.filter(f => f.name !== '.emptyFolderPlaceholder')); 
    
    const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (projData) setProjects(projData);

    setLoading(false);
  };

  // UPDATED: The 3-Step Upload Engine
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !templateId) return;
    setIsUploading(true);
    setUploadStatus({ text: 'Step 1: Encrypting and uploading secure file...', type: 'loading' });

    try {
      const originalFilename = file.name;
      const safeName = originalFilename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const storagePath = `${Date.now()}-${Math.round(Math.random() * 1000)}-${safeName}`;

      // 1. Upload to Supabase Storage Bucket
      const { error: storageError } = await supabase.storage
        .from('templates')
        .upload(storagePath, file);

      if (storageError) throw storageError;

      setUploadStatus({ text: 'Step 2: Recording file metadata...', type: 'loading' });

      // 2. Insert into files table
      const { data: fileRecord, error: fileDbError } = await supabase
        .from('files')
        .insert([{
          product_id: templateId,
          storage_path: storagePath,
          original_filename: originalFilename,
          version_notes: versionNotes || 'Routine update'
        }])
        .select('id')
        .single();

      if (fileDbError) throw fileDbError;

      setUploadStatus({ text: 'Step 3: Linking file to storefront...', type: 'loading' });

      // 3. Update the products table
      const { error: productUpdateError } = await supabase
        .from('products')
        .update({ current_file_id: fileRecord.id })
        .eq('id', templateId);

      if (productUpdateError) throw productUpdateError;

      setUploadStatus({ text: `Success! ${originalFilename} safely deployed.`, type: 'success' });
      setFile(null); 
      setVersionNotes('');
      fetchDashboardData(); 
    } catch (error) {
      setUploadStatus({ text: `Upload failed: ${error.message}`, type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('projects').insert([{ client_email: newProjectEmail, project_name: newProjectName }]);
    if (!error) {
      setNewProjectEmail(''); setNewProjectName(''); fetchDashboardData();
    } else alert("Error creating project: " + error.message);
  };

  const handleUpdateStatus = async (projectId, newStep) => {
    const { error } = await supabase.from('projects').update({ status_step: newStep }).eq('id', projectId);
    if (!error) fetchDashboardData();
  };

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    setIsGranting(true);
    setGrantStatus({ text: 'Executing override protocols...', type: 'loading' });

    try {
      const { data, error } = await supabase.rpc('admin_grant_access', {
        target_email: grantEmail,
        // Assuming your RPC function still expects an integer or handles the UUID
        t_id: grantTemplateId 
      });

      if (error) throw error;

      if (data && data.startsWith('Error')) {
        setGrantStatus({ text: data, type: 'error' });
      } else {
        setGrantStatus({ text: `Bypass Success: File unlocked for ${grantEmail}`, type: 'success' });
        setGrantEmail('');
        fetchDashboardData(); 
      }
    } catch (err) {
      setGrantStatus({ text: `System Error: ${err.message}`, type: 'error' });
    } finally {
      setIsGranting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center text-red-400 font-bold animate-pulse tracking-widest uppercase">Initializing Command Center...</div>;

  const uniqueTemplateClients = new Set(purchases.map(p => p.user_email)).size;
  const uniqueConsultingClients = new Set(projects.map(p => p.client_email)).size;
  const totalVolume = (purchases.length * 19.99).toFixed(2);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-red-500 selection:text-white relative overflow-x-hidden pb-20">
      <NoiseOverlay />
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-red-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0"></div>

      <nav className="relative z-50 border-b border-white/10 py-5 px-8 flex justify-between items-center bg-black/50 backdrop-blur-2xl">
        <div className="text-xl font-black text-white tracking-tighter drop-shadow-lg flex items-center gap-2">
          OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span> 
          <span className="bg-red-500/10 text-red-400 text-xs px-2 py-0.5 rounded border border-red-500/20 ml-2 font-mono">ROOT_ACCESS</span>
        </div>
        <Link to="/portal" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">← Return to Portal</Link>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Volume</h3>
            <p className="text-3xl font-light text-white">${totalVolume}</p>
          </div>
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Assets Deployed</h3>
            <p className="text-3xl font-light text-gray-300">{vaultFiles.length}</p>
          </div>
          <div className="bg-black/40 border border-white/5 border-b-2 border-b-cyan-500/50 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-cyan-500/70 text-xs font-bold uppercase tracking-widest mb-2">Template Clients</h3>
            <p className="text-3xl font-light text-cyan-400">{uniqueTemplateClients}</p>
          </div>
          <div className="bg-black/40 border border-white/5 border-b-2 border-b-violet-500/50 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-violet-400/70 text-xs font-bold uppercase tracking-widest mb-2">Consulting Clients</h3>
            <p className="text-3xl font-light text-violet-400">{uniqueConsultingClients}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* LEFT COLUMN: Operations (Upload & Override) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. Upload Module */}
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[40px]"></div>
              <h2 className="text-2xl font-bold mb-6 relative z-10 flex items-center gap-2">
                <span className="text-red-400">↑</span> Deploy Master File
              </h2>
              {uploadStatus.text && (
                <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-wide mb-6 border relative z-10 ${uploadStatus.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/30' : uploadStatus.type === 'success' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-violet-500/10 text-violet-400 border-violet-500/30 animate-pulse'}`}>
                  {uploadStatus.text}
                </div>
              )}
              <form onSubmit={handleUpload} className="space-y-6 relative z-10">
                <div>
                  <select value={templateId} onChange={(e) => setTemplateId(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-400/50 text-sm">
                    {productsList.length === 0 ? <option value="">No products available</option> : null}
                    {productsList.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <input type="text" placeholder="Version Notes (Optional)" value={versionNotes} onChange={(e) => setVersionNotes(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-400/50 text-sm" />
                </div>
                <div>
                  <input type="file" required onChange={(e) => setFile(e.target.files[0])} className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer text-sm" />
                </div>
                <button type="submit" disabled={!file || isUploading || productsList.length === 0} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-red-400 hover:shadow-[0_0_20px_rgba(248,113,113,0.4)] transition-all duration-300 disabled:opacity-50 mt-2">
                  {isUploading ? 'Executing...' : 'Upload Payload'}
                </button>
              </form>
            </div>

            {/* 2. Manual Override Module */}
            <div className="bg-red-500/5 border border-red-500/20 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-red-400">
                <span>⚠</span> Manual Access Override
              </h2>
              <p className="text-xs text-gray-400 mb-6">Bypass payment gateway and inject framework access directly to a user's portal. User must have an existing account.</p>
              
              {grantStatus.text && (
                <div className={`p-4 rounded-xl text-xs font-bold uppercase tracking-wide mb-6 border relative z-10 ${grantStatus.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/30' : grantStatus.type === 'success' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-violet-500/10 text-violet-400 border-violet-500/30 animate-pulse'}`}>
                  {grantStatus.text}
                </div>
              )}

              <form onSubmit={handleGrantAccess} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Target User Email" 
                  required
                  value={grantEmail}
                  onChange={(e) => setGrantEmail(e.target.value)}
                  className="w-full bg-black/50 border border-red-500/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-red-400/50 text-sm"
                />
                <select value={grantTemplateId} onChange={(e) => setGrantTemplateId(e.target.value)} className="w-full bg-black/50 border border-red-500/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-red-400/50 text-sm">
                  {productsList.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
                <button type="submit" disabled={isGranting || productsList.length === 0} className="w-full bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white font-bold py-2 rounded-xl transition-all duration-300 disabled:opacity-50 text-sm">
                  {isGranting ? 'Authorizing...' : 'Force Grant Access'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Consulting CRM Manager */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8 h-full">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <span className="text-violet-400">⚡</span> Consulting Engagements
              </h2>

              <form onSubmit={handleCreateProject} className="flex flex-col xl:flex-row gap-4 mb-8">
                <input type="email" placeholder="Client Email" required value={newProjectEmail} onChange={(e) => setNewProjectEmail(e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-400/50 text-sm" />
                <input type="text" placeholder="Project Name" required value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-400/50 text-sm" />
                <button type="submit" className="bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500 hover:text-white px-6 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap">
                  Initialize Client
                </button>
              </form>

              <div className="space-y-4">
                {projects.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No active consulting engagements.</p>
                ) : (
                  projects.map(project => (
                    <div key={project.id} className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
                      <div>
                        <h4 className="text-white font-bold">{project.project_name}</h4>
                        <p className="text-xs text-gray-500 font-mono">{project.client_email}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-black/60 p-1 rounded-lg border border-white/5 self-start xl:self-auto">
                        <button onClick={() => handleUpdateStatus(project.id, 1)} className={`px-3 py-1 text-xs font-bold rounded ${project.status_step >= 1 ? 'bg-violet-500 text-white' : 'text-gray-500 hover:text-white transition-colors'}`}>1. Audit</button>
                        <button onClick={() => handleUpdateStatus(project.id, 2)} className={`px-3 py-1 text-xs font-bold rounded ${project.status_step >= 2 ? 'bg-violet-500 text-white' : 'text-gray-500 hover:text-white transition-colors'}`}>2. Build</button>
                        <button onClick={() => handleUpdateStatus(project.id, 3)} className={`px-3 py-1 text-xs font-bold rounded ${project.status_step >= 3 ? 'bg-violet-500 text-white' : 'text-gray-500 hover:text-white transition-colors'}`}>3. Hand-off</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Live Revenue Ledger */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-green-400">●</span> Live Ledger & Access Logs
            </h2>
            <span className="text-xs text-gray-500 font-mono bg-black/50 px-3 py-1 rounded-full border border-white/5">
              {purchases.length} RECORDS FOUND
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 uppercase tracking-widest text-xs border-b border-white/5">
                  <th className="pb-4 font-bold">Timestamp</th>
                  <th className="pb-4 font-bold">Client Email</th>
                  <th className="pb-4 font-bold text-center">Item ID</th>
                  <th className="pb-4 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-500 italic">No transactions detected.</td>
                  </tr>
                ) : (
                  purchases.map((purchase) => (
                    <tr key={purchase.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 text-gray-400 font-mono text-xs">
                        {new Date(purchase.created_at).toLocaleDateString()} {new Date(purchase.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </td>
                      <td className="py-4 text-gray-200">{purchase.user_email}</td>
                      <td className="py-4 text-center">
                        <span className="bg-white/10 text-white px-2 py-0.5 rounded text-xs font-mono">
                          #{purchase.template_id}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Cleared / Granted</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
      {/* Footer */}
      <Footer />  
    </div>
  );
}