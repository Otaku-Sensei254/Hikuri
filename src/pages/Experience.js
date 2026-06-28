import React, { useEffect } from 'react';

function Experience() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scale-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features">
      <div className="container">
        <h2 style={{ textAlign: 'center', display: 'block', marginBottom: '3rem', color: 'var(--retro-mustard)' }}>
          The Hikuri Experience
        </h2>
        <div className="features-grid">
          <div className="feature-item scale-in stagger-1">
            <h3>Chilled Vibes</h3>
            <p>Curated playlists and a peaceful atmosphere for ultimate relaxation.</p>
          </div>
          <div className="feature-item scale-in stagger-2">
            <h3>Photo Ready</h3>
            <p>Aesthetically pleasing corners and natural light for your photoshoot sessions.</p>
          </div>
          <div className="feature-item scale-in stagger-3">
            <h3>Garden Space</h3>
            <p>Beautiful green lawns to enjoy your cup of coffee under the open sky.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
