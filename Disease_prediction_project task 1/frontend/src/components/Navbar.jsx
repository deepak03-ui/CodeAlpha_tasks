import { NavLink } from 'react-router-dom';
import { Activity } from 'lucide-react';

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <Activity size={24} />
          <span>HealthPredict AI</span>
        </NavLink>

        <nav className="nav-menu">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/predict" className={linkStyle}>
            Predict
          </NavLink>
          <NavLink to="/models" className={linkStyle}>
            Models
          </NavLink>
          <NavLink to="/about" className={linkStyle}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;