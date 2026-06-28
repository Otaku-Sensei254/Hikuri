import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import MenuPage from './pages/MenuPage';
import Gallery from './pages/Gallery';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import OrderPage from './pages/OrderPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/menu" element={<Layout><MenuPage /></Layout>} />
      <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
      <Route path="/experience" element={<Layout><Experience /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
