import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const links = [
    { path: '/',         label: 'Home' },
    { path: '/about',    label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/contact',  label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">ShopSite</div>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;