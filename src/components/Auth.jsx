import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { usePageMeta } from '../utils/usePageMeta';

const Auth = ({ initialIsLogin = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine mode from route path or initialIsLogin prop
  const isSignUpRoute = location.pathname === '/signup';
  const [isLogin, setIsLogin] = useState(isSignUpRoute ? false : initialIsLogin);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (location.pathname === '/signup') {
      setIsLogin(false);
    } else if (location.pathname === '/login') {
      setIsLogin(true);
    }
  }, [location.pathname]);

  usePageMeta({
    title: isLogin ? 'Sign In — OptiVoic' : 'Create Account — OptiVoic',
    description: isLogin ? 'Sign in to access your OptiVoic portal and purchased templates.' : 'Create your free OptiVoic account to access digital templates and operational frameworks.',
    canonical: `https://www.optivoic.com${location.pathname}`
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        // Handle Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Successfully authenticated! Redirecting to portal...' });
        setTimeout(() => {
          navigate('/portal');
        }, 800);
      } else {
        // Handle Registration
        const { error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            data: { full_name: name.trim() }
          }
        });
        if (error) throw error;
        setMessage({ type: 'success', text: 'Account created! Redirecting to your portal...' });
        setTimeout(() => {
          navigate('/portal');
        }, 800);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'An error occurred during authentication.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-20 px-6 sm:px-8 flex items-center justify-center relative z-10 selection:bg-cyan-500 selection:text-white">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container with generous padding & margins */}
      <div className="w-full max-w-lg bg-black/60 border border-white/15 rounded-[32px] p-8 sm:p-12 shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden my-8">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />
        
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-3xl font-black text-white tracking-tighter drop-shadow-lg mb-3 hover:opacity-90 transition-opacity">
            OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight mb-2">
            {isLogin ? 'Access Your Account' : 'Create Your Account'}
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            {isLogin ? 'Sign in to access your digital templates and client portal.' : 'Get started with your secure OptiVoic portal account.'}
          </p>
        </div>

        {/* Status Messages */}
        {message.text && (
          <div className={`p-4 rounded-2xl mb-8 text-xs font-semibold leading-relaxed ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'}`}>
            {message.text}
          </div>
        )}

        {/* Auth Form with clean spacing & generous padding */}
        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 text-sm transition-all"
                placeholder="Jane Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 text-sm transition-all"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 text-sm transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-white font-bold text-base py-4 px-6 rounded-xl hover:shadow-[0_0_30px_rgba(56,182,255,0.4)] transition-all duration-300 disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In →' : 'Create Free Account →')}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage({ type: '', text: '' });
            }}
            className="text-xs font-semibold text-gray-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;