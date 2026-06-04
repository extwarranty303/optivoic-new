import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './FullscreenNav.css';

const FullscreenNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Lightning Bolt Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fullscreen-nav-toggle"
        aria-label="Toggle navigation"
      >
        <svg
          className={`lightning-bolt ${isOpen ? 'active' : ''}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="boltGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E67F8" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" fill="url(#boltGradient)" />
        </svg>
      </button>

      {/* Fullscreen Overlay */}
      <div className={`fullscreen-nav-overlay ${isOpen ? 'open' : ''}`}>
        {/* Background Gradient */}
        <div className="fullscreen-nav-bg">
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
          <div className="glow glow-3"></div>
        </div>

        {/* Navigation Content */}
        <div className="fullscreen-nav-content">
          <div className="nav-grid">
            {/* Logo */}
            <div className="nav-item nav-logo">
              <span>OPTIVÖIC</span>
            </div>

            {/* Navigation Links */}
            <NavLink to="/" end className={`nav-item nav-link`}>
              <span className="link-label">Home</span>
              <span className="link-icon">↗</span>
            </NavLink>

            <NavLink to="/marketplace" className="nav-item nav-link">
              <span className="link-label">Marketplace</span>
              <span className="link-icon">↗</span>
            </NavLink>

            <NavLink to="/consulting" className="nav-item nav-link">
              <span className="link-label">Hire the Agency</span>
              <span className="link-icon">↗</span>
            </NavLink>

            <a href="mailto:hello@optivoic.com" className="nav-item nav-link">
              <span className="link-label">Get in Touch</span>
              <span className="link-icon">✉</span>
            </a>

            {/* Footer Info */}
            <div className="nav-item nav-footer">
              <p>Elite technology consulting & operational frameworks for digital enterprises.</p>
              <p className="text-sm mt-4 text-gray-500">© 2026 OptiVoic. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullscreenNav;
