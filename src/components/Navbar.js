import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo.jpeg';

const links = [
  { path: '/about', label: 'About' },
  { path: '/menu', label: 'Menu' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/experience', label: 'Experience' },
  { path: '/contact', label: 'Contact' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const showScrolled = !isHome || scrollY > 50;

  return (
    <nav className={`navbar container${showScrolled ? ' scrolled' : ''}`}>
      <div className="logo hover-lift" onClick={() => { closeMenu(); navigate('/'); }} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Hikuri Coffee Logo" />
      </div>

      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        {links.map(l => (
          <li key={l.path}>
            <a
              href={l.path}
              onClick={(e) => { e.preventDefault(); closeMenu(); navigate(l.path); }}
              style={{ opacity: location.pathname === l.path ? 0.6 : 1 }}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li><button onClick={() => navigate('/order')} className="nav-order-btn">Order Now</button></li>
        <li><button onClick={() => navigate('/admin')} className="nav-admin-btn">Admin</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
