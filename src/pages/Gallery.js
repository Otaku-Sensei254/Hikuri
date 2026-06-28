import React, { useEffect } from 'react';
import coffeehandImg from '../images/coffeehand.jpeg';
import hand2Img from '../images/hand2.jpeg';
import chillImg from '../images/chill.jpeg';
import in2Img from '../images/in2.jpeg';
import hikuriImg from '../images/hikuri.jpg';
import hikuri2Img from '../images/hikuri2.jpeg';
import image2Img from '../images/image2.jpeg';
import tuffImg from '../images/tuff.jpeg';
import deck2Img from '../images/deck2.jpeg';
import posterImg from '../images/poster.jpeg';

function Gallery() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="gallery">
      <div className="container">
        <h2 className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem', display: 'block' }}>
          Moments at Hikuri
        </h2>
        <div className="gallery-grid">
          {[coffeehandImg, hand2Img, chillImg, in2Img, hikuriImg, hikuri2Img, image2Img, tuffImg, deck2Img, posterImg].map((img, i) => (
            <div key={i} className={`gallery-item fade-in stagger-${(i % 5) + 1}`}>
              <img src={img} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
