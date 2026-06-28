import React, { useEffect } from 'react';
import aboutImg from '../images/in.jpeg';

function About() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about">
      <div className="container" style={{ padding: '1.5rem' }}>
        <h2 className="fade-in">About Hikuri</h2>
        <div className="about-grid">
          <div className="about-text slide-in-left">
            <p>
              Nestled at <strong>2 James Gichuru Road, Lavington</strong>, Hikuri Coffee is more than just a cafe. 
              It's a sanctuary designed for those who seek a chilled, cozy environment to unwind.
            </p>
            <p>
              Whether you're here for our expertly roasted micro-batch coffee, a quiet place to read, 
              or a beautiful backdrop for your next photoshoot, we offer a space that feels like home.
            </p>
            <p>
              Enjoy the gentle breeze on our lush green grass, accompanied by the perfect soundtrack to your afternoon.
            </p>
          </div>
          <div className="about-image slide-in-right">
            <img src={aboutImg} alt="Cozy Interior" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
