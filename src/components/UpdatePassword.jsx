import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const NoiseOverlay = () => (
  <div className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
);

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      
      setMessage({ text: 'Password successfully updated! Redirecting to portal...', type: 'success' });
      
      setTimeout(() => {
        navigate('/portal');
      }, 2000);

    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <NoiseOverlay />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-[100px] pointer-events-none"></div>

      <div className="bg-white/[0.05] border border-white/20 backdrop-blur-3xl rounded-3xl max-w-sm w-full p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative z-10">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Secure Reset</h2>
        <p className="text-gray-400 text-sm mb-8">Enter your new password below.</p>

        {message.text && (
          <div className={`p-3 rounded-lg text-sm mb-6 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">New Password</label>
            <input 
              type="password" required minLength="6" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50"
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold text-lg py-3 rounded-xl hover:bg-cyan-400 transition-all duration-300 mt-4 disabled:opacity-50">
            {loading ? 'Updating...' : 'Save New Password'}
          </button>
        </form>
      </div>
    </div>
  );
}