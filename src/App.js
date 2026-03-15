import React, { useState } from 'react';
import './App.css';

// Importing images from the src/images folder
import logo from './images/logo.jpeg';
import heroImg from './images/deck.jpeg';
import aboutImg from './images/in.jpeg';
import chillImg from './images/chill.jpeg';
import coffeehandImg from './images/coffeehand.jpeg';
import hand2Img from './images/hand2.jpeg';
import hikuriImg from './images/hikuri.jpg';
import hikuri2Img from './images/hikuri2.jpeg';
import image2Img from './images/image2.jpeg';
import in2Img from './images/in2.jpeg';
import posterImg from './images/poster.jpeg';
import tuffImg from './images/tuff.jpeg';
import deck2Img from './images/deck2.jpeg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar container">
        <div className="logo">
          <img src={logo} alt="Hikuri Coffee Logo" />
        </div>

        {/* Hamburger Icon */}
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
          <li><a href="#features" onClick={closeMenu}>Experience</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <img src={heroImg} alt="Hikuri Garden" className="hero-img" />
        <div className="hero-content">
          <p>Welcome to</p>
          <h1>Hikuri Coffee</h1>
          <p>Espresso Bar & Micro Roaster</p>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about container">
        <h2>Your Tranquil Escape</h2>
        <div className="about-grid">
          <div className="about-text">
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
          <div className="about-image">
            <img src={aboutImg} alt="Cozy Interior" />
          </div>
        </div>
      </section>

      {/* Experience / Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <h3>Chilled Vibes</h3>
              <p>Curated playlists and a peaceful atmosphere for ultimate relaxation.</p>
            </div>
            <div className="feature-item">
              <h3>Photo Ready</h3>
              <p>Aesthetically pleasing corners and natural light for your photoshoot sessions.</p>
            </div>
            <div className="feature-item">
              <h3>Garden Space</h3>
              <p>Beautiful green lawns to enjoy your cup of coffee under the open sky.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>Moments at Hikuri</h2>
          <div className="gallery-grid">
            <div className="gallery-item"><img src={coffeehandImg} alt="Coffee Craft" /></div>
            <div className="gallery-item"><img src={hand2Img} alt="Coffee detail" /></div>
            <div className="gallery-item"><img src={chillImg} alt="Chilled mood" /></div>
            <div className="gallery-item"><img src={in2Img} alt="Interior detail" /></div>
            <div className="gallery-item"><img src={hikuriImg} alt="Hikuri lifestyle" /></div>
            <div className="gallery-item"><img src={hikuri2Img} alt="Hikuri exterior" /></div>
            <div className="gallery-item"><img src={image2Img} alt="Coffee bar" /></div>
            <div className="gallery-item"><img src={tuffImg} alt="Outdoor seating" /></div>
            <div className="gallery-item"><img src={deck2Img} alt="The deck" /></div>
            <div className="gallery-item"><img src={posterImg} alt="Art at Hikuri" /></div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact">
        <div className="container footer-content">
          <div className="footer-section">
            <h4>Location</h4>
            <p>2 James Gichuru Road</p>
            <p>Lavington, Nairobi, Kenya</p>
            <a href="https://maps.app.goo.gl/5UpXDbYcdiXreQyi8" target="_blank" rel="noreferrer" style={{color: 'white', fontSize: '0.8rem'}}>View on Google Maps</a>
          </div>
          <div className="footer-section">
            <h4>Hours</h4>
            <p>Mon - Sun: 8:00 AM - 6:00 PM</p>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://instagram.com/hikuricoffee" target="_blank" rel="noreferrer">Instagram</a>
            </div>
            <p style={{marginTop: '10px', fontSize: '0.9rem'}}>2,890 Followers</p>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Hikuri Coffee. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
