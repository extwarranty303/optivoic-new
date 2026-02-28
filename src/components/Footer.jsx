import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#020202] py-12 px-8 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div>
          <div className="text-xl font-black text-white tracking-tighter drop-shadow-lg opacity-50 mb-2">
            OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
          </div>
          <p className="text-gray-600 text-xs">OptiVoic Consulting and Software © {currentYear}</p>
        </div>

        {/* Legal Links */}
        <div className="flex gap-6">
          <Link to="/privacy" className="text-xs font-bold text-gray-500 hover:text-cyan-400 transition-colors uppercase tracking-widest">
            Privacy Policy
          </Link>
          <a href="mailto:hello@optivoic.com" className="text-xs font-bold text-gray-500 hover:text-violet-400 transition-colors uppercase tracking-widest">
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
}