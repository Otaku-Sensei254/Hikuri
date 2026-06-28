import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />
      {!isHome && <div style={{ height: '80px' }} />}
      {children}
      <Footer />
    </>
  );
}

export default Layout;
