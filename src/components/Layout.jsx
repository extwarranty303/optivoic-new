import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SpaceBackground from './SpaceBackground';
import Footer from './Footer';

const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
    <SpaceBackground />
    <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000 z-0"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/10 blur-[150px] rounded-full mix-blend-screen z-0"></div>
  </div>
);

const Navbar = ({ navAction }) => {
  const location = useLocation();
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
        OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
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
      {navAction}
    </nav>
  );
};

const Layout = ({ children, navAction }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white relative">
      <AmbientBackground />
      <Navbar navAction={navAction} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;