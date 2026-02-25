import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; 
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ isOpen, onClose, redirectTo }) {
  const navigate = useNavigate();
  const [view, setView] = useState('login'); // 'login', 'signup', or 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  if (!isOpen) return null;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (view === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage({ text: 'Successfully logged in!', type: 'success' });
        setTimeout(() => {
          onClose();
          navigate(redirectTo || '/portal');
        }, 1000);

      } else if (view === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ text: 'Account created! You can now log in.', type: 'success' });
        setView('login'); 

      } else if (view === 'forgot') {
        // --- NEW: Password Reset Request ---
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'http://localhost:5173/update-password',
        });
        if (error) throw error;
        setMessage({ text: 'Password reset link sent! Check your email.', type: 'success' });
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white/[0.05] border border-white/20 backdrop-blur-3xl rounded-3xl max-w-sm w-full p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
        
        <div className="absolute top-0 left-0 w-48 h-48 bg-violet-500/20 blur-[60px] pointer-events-none"></div>

        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 flex items-center justify-center rounded-full transition-all backdrop-blur-md z-[200] cursor-pointer">
          ✕
        </button>

        <div className="relative z-10 mb-8">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
            {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="text-gray-400 text-sm">
            {view === 'forgot' ? 'Enter your email to receive a secure recovery link.' : 'Access your premium digital frameworks.'}
          </p>
        </div>

        {message.text && (
          <div className={`p-3 rounded-lg text-sm mb-6 relative z-10 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50"
              placeholder="name@company.com"
            />
          </div>
          
          {view !== 'forgot' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                {view === 'login' && (
                  <button type="button" onClick={() => { setView('forgot'); setMessage({text:'', type:''}); }} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                    Forgot?
                  </button>
                )}
              </div>
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50"
                placeholder="••••••••"
              />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-white text-black font-bold text-lg py-3 rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(56,182,255,0.4)] transition-all duration-300 mt-4 disabled:opacity-50">
            {loading ? 'Processing...' : (view === 'login' ? 'Log In' : view === 'signup' ? 'Sign Up' : 'Send Reset Link')}
          </button>
        </form>

        <div className="mt-6 text-center relative z-10">
          <button type="button" onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setMessage({text:'', type:''}); }} className="text-gray-400 hover:text-white text-sm transition-colors">
            {view === 'login' ? "Don't have an account? Sign up" : "Back to login"}
          </button>
        </div>

      </div>
    </div>
  );
}