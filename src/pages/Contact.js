import React, { useEffect } from 'react';

function Contact() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: '100px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="fade-in" style={{ display: 'block', marginBottom: '1.5rem' }}>Get in Touch</h2>
      <p style={{ color: 'var(--retro-brown)', fontSize: '1.1rem', marginBottom: '2rem' }}>
        We'd love to hear from you. Reach out or swing by!
      </p>

      <div style={{ display: 'grid', gap: '1.5rem', textAlign: 'left' }}>
        <div style={{ padding: '1.5rem', border: '3px solid var(--retro-dark)', background: 'white' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>📍 Location</h3>
          <p style={{ color: 'var(--retro-brown)' }}>2 James Gichuru Road, Lavington, Nairobi</p>
        </div>
        <div style={{ padding: '1.5rem', border: '3px solid var(--retro-dark)', background: 'white' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>🕐 Hours</h3>
          <p style={{ color: 'var(--retro-brown)' }}>Mon - Sun: 8:00 AM - 6:00 PM</p>
        </div>
        <div style={{ padding: '1.5rem', border: '3px solid var(--retro-dark)', background: 'white' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>📸 Instagram</h3>
          <p style={{ color: 'var(--retro-brown)' }}>@hikuricoffee — 2,890 Followers</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
