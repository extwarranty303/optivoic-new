import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="optivoic-sidebar">
      <div className="sidebar-logo">OPTIVÖIC</div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-item">Home</NavLink>
        <NavLink to="/marketplace" className="nav-item">Marketplace</NavLink>
        <NavLink to="/consulting" className="nav-item">Hire the Agency</NavLink>
        <a href="mailto:hello@optivoic.com" className="nav-item">Contact</a>
      </nav>
    </aside>
  );
};

export default Sidebar;