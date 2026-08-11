import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '260px' : '80px');
  }, [isOpen]);

  return (
    <aside className={`optivoic-sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>☰</button>
      {isOpen && (
        <>
          <div className="sidebar-logo text-xl font-black text-white tracking-tighter drop-shadow-lg">
            OPTI<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">VÖIC</span>
          </div>
          <nav className="sidebar-nav">
            <NavLink to="/" end className="nav-item">Home</NavLink>
            <NavLink to="/marketplace" className="nav-item">Marketplace</NavLink>
            <NavLink to="/consulting" className="nav-item">Hire the Agency</NavLink>
            <a href="mailto:hello@optivoic.com" className="nav-item">Contact</a>
          </nav>
        </>
      )}
    </aside>
  );
};

export default Sidebar;