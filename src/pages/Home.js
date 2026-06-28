import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from '../images/deck.jpeg';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const heroImg = document.querySelector('.hero-img');
    const onScroll = () => {
      if (heroImg) heroImg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    };
    window.addEventListener('scroll', onScroll);

    setTimeout(() => {
      document.querySelector('.hero-content')?.classList.add('animate-fadeInUp');
    }, 300);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="hero">
        <div className="hero-overlay"></div>
        <img src={heroImg} alt="Hikuri Garden" className="hero-img parallax" />
        <div className="hero-content">
          <p>Welcome to</p>
          <h1>Hikuri Coffee</h1>
          <p>Espresso Bar & Micro Roaster</p>
        </div>
        

      </header>

      <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ display: 'block', marginBottom: '1.5rem' }}>Your Tranquil Escape</h2>
        <p style={{ color: 'var(--retro-brown)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
          Nestled in Lavington, Hikuri Coffee is a sanctuary for those who seek a chilled, cozy 
          environment to unwind — with expertly roasted coffee, good music, and a lush garden.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/menu')} className="order-btn">View Menu</button>
          <button onClick={() => navigate('/about')} className="order-btn" style={{ background: 'var(--retro-orange)', borderColor: 'var(--retro-orange)' }}>About Us</button>
        </div>
      </section>
    </>
  );
}

export default Home;
