import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import SpaceBackground from './SpaceBackground';
import Footer from './Footer';
import AuthModal from './AuthModal';

const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
    <SpaceBackground />
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000 z-0"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen z-0"></div>
  </div>
);

const Navbar = ({ onLoginClick, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = [
    { path: "/marketplace", label: "Marketplace" },
    { path: "/consulting", label: "Consulting" },
    { path: "/blog", label: "Blog" },
    { path: "/faq", label: "FAQ" },
    { path: "/aiservice", label: "AI Websites" },
  ];

  return (
    <nav className="fixed w-full border-b border-white/10 py-4 px-8 flex justify-between items-center bg-black/30 backdrop-blur-2xl z-50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <Link to="/" className="text-2xl font-black text-white tracking-tighter drop-shadow-lg hover:opacity-90 transition-opacity">
        OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VOIC</span>
      </Link>
      <div className="hidden md:flex space-x-8 font-medium text-sm text-gray-300">
        {navLinks.map(link => (
          <Link 
            key={link.path} 
            to={link.path} 
            className={`transition-all ${location.pathname === link.path ? 'text-white' : 'hover:text-white'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      {user ? (
        <button 
          onClick={() => navigate('/portal')} 
          className="bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 text-cyan-300 text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer"
        >
          Client Portal
        </button>
      ) : (
        <button 
          onClick={onLoginClick} 
          className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer"
        >
          Client Login
        </button>
      )}
    </nav>
  );
};

const Layout = ({ children }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      <AmbientBackground />
      <Navbar user={user} onLoginClick={() => setIsAuthOpen(true)} />
      {/* Add padding-top to account for the fixed navbar height */}
      <main className="relative z-10 pt-20">
        {children}
      </main>
      {/* The AuthModal is now managed by the global Layout */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <Footer />
    </div>
  );
};

export default Layout;