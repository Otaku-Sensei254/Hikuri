import React, { useState, useEffect } from 'react';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import CustomerOrder from './components/CustomerOrder';

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

// New coffee and food images
import andromedaCoffeeImg from './images/andromeda-coffee.jpg';
import redrumCoffeeImg from './images/redrum-coffee.jpg';
import apexCoffeeImg from './images/apex-coffee.jpg';
import acrewoodCoffeeImg from './images/acrewood-coffee.jpg';
import kojiSakeCoffeeImg from './images/koji-sake-coffee.jpg';
import croissantImg from './images/croissant.jpg';
import blueberryMuffinImg from './images/blueberry-muffin.jpg';
import cinnamonRollImg from './images/cinnamon-roll.jpg';
import avocadoToastImg from './images/avocado-toast.jpg';
import grilledCheeseImg from './images/grilled-cheese.jpg';
import fruitBowlImg from './images/fruit-bowl.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);

  // Pour over menu data
  const pourOverMenu = [
    {
      name: "ANDROMEDA",
      farm: "South of the Rift Coffees",
      region: "Rongo",
      varietal: "Riuru 11",
      process: "Lacto Washed",
      characteristics: "Clean & Smooth",
      price: 650,
      image: andromedaCoffeeImg
    },
    {
      name: "REDRUM",
      farm: "Kahira-ini factory",
      region: "Mathira North, Nyeri",
      varietal: "Batian, Ruiru II",
      process: "Natural",
      characteristics: "Silky & Sweet",
      price: 650,
      image: redrumCoffeeImg
    },
    {
      name: "APEX",
      farm: "Rift Valley Coffee",
      region: "Nandi County",
      varietal: "Batian + Ruiru 11",
      process: "Natural Anaerobic",
      characteristics: "Bright & Fruity",
      price: 550,
      image: apexCoffeeImg
    },
    {
      name: "100 ACRE WOOD",
      farm: "Ngacha Coffee Estate",
      region: "Kirinyaga",
      varietal: "SL28/34",
      process: "Yellow Honey",
      characteristics: "Complex & Intense",
      price: 800,
      image: acrewoodCoffeeImg
    },
    {
      name: "KOJI SAKE",
      farm: "South of the Rift Coffees",
      region: "Rongo",
      varietal: "Riuru 11",
      process: "Anaerobic Natural with Koji Inoculation",
      characteristics: "Tangy & Boozy",
      price: 650,
      image: kojiSakeCoffeeImg
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOrderNow = (item) => {
    setSelectedItem(item);
    setCurrentPage('order');
  };

  // Scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Parallax effect for hero
      const heroImg = document.querySelector('.hero-img');
      if (heroImg) {
        heroImg.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      // Reveal animations on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      // Observe all animation elements
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Check for admin URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setCurrentPage('admin');
    }
  }, []);
  
  // eslint-disable-next-line no-unused-vars

  // Initial animations
  useEffect(() => {
    // Animate hero content on load
    setTimeout(() => {
      document.querySelector('.hero-content')?.classList.add('animate-fadeInUp');
    }, 300);

    // Menu tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCategory = btn.dataset.category;
        
        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active category
        menuCategories.forEach(cat => {
          cat.classList.remove('active');
          if (cat.id === targetCategory) {
            cat.classList.add('active');
            // Re-trigger animations for new items
            const items = cat.querySelectorAll('.menu-item');
            items.forEach((item, index) => {
              item.style.animation = 'none';
              setTimeout(() => {
                item.style.animation = '';
              }, index * 100);
            });
          }
        });
      });
    });
  }, []);

  if (currentPage === 'admin') {
    return <AdminDashboard />;
  }

  if (currentPage === 'order') {
    return <CustomerOrder selectedItem={selectedItem} />;
  }

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar container ${scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="logo hover-lift">
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
          <li><a href="#menu" onClick={closeMenu}>Menu</a></li>
          <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
          <li><a href="#features" onClick={closeMenu}>Experience</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          <li><button onClick={() => setCurrentPage('order')} className="nav-order-btn">Order Now</button></li>
          <li><button onClick={() => setCurrentPage('admin')} className="nav-admin-btn">Admin</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <img src={heroImg} alt="Hikuri Garden" className="hero-img parallax" />
        <div className="hero-content">
          <p className="fade-in stagger-1">Welcome to</p>
          <h1 className="text-gradient fade-in stagger-2">Hikuri Coffee</h1>
          <p className="fade-in stagger-3">Espresso Bar & Micro Roaster</p>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="about container" style={{padding: '1.5rem'}}>
        <h2 className="fade-in">Your Tranquil Escape</h2>
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
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu">
        <div className="container">
          <h2 className="fade-in">Our Menu</h2>
          <p className="menu-intro fade-in">Crafted with care, served with love</p>
          
          <div className="menu-categories">
            <div className="category-tabs">
              <button className="tab-btn active" data-category="pourover">Pour Over</button>
              <button className="tab-btn" data-category="coffee">Coffee</button>
              <button className="tab-btn" data-category="pastries">Pastries</button>
              <button className="tab-btn" data-category="bites">Light Bites</button>
            </div>
          </div>

          <div className="menu-grid">
            <div className="menu-category active" id="pourover">
              {pourOverMenu.map((coffee, index) => (
                <div key={coffee.name} className={`menu-item-card scale-in stagger-${(index % 6) + 1}`}>
                  <div className="coffee-image-container">
                    <img src={coffee.image} alt={coffee.name} className="coffee-image" />
                    <div className="coffee-overlay">
                      <div className="coffee-details">
                        <h3>{coffee.name}</h3>
                        <p className="price">Ksh {coffee.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="coffee-info">
                    <h4>{coffee.name}</h4>
                    <div className="coffee-meta">
                      <span className="meta-item"><strong>Farm:</strong> {coffee.farm}</span>
                      <span className="meta-item"><strong>Region:</strong> {coffee.region}</span>
                      <span className="meta-item"><strong>Varietal:</strong> {coffee.varietal}</span>
                      <span className="meta-item"><strong>Process:</strong> {coffee.process}</span>
                      <span className="meta-item characteristics"><strong>Taste:</strong> {coffee.characteristics}</span>
                    </div>
                    <div className="coffee-footer">
                      <span className="price-tag">Ksh {coffee.price}</span>
                      <button className="order-btn" onClick={() => handleOrderNow(coffee)}>Order Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="menu-category" id="coffee">
              <div className="menu-item scale-in stagger-6">
                <div className="item-header">
                  <h4>Hikuri House Blend (250g)</h4>
                  <span className="price">Ksh 850</span>
                </div>
                <p className="item-description">Take home our signature medium roast with notes of chocolate and caramel</p>
                <div className="item-tags">
                  <span className="tag">Coffee Seeds</span>
                  <span className="tag">Packaging</span>
                  <span className="tag">Popular</span>
                </div>
              </div>
              
              <div className="menu-item scale-in stagger-1">
                <div className="item-header">
                  <h4>Single Origin Ethiopia (250g)</h4>
                  <span className="price">Ksh 950</span>
                </div>
                <p className="item-description">Bright and fruity single origin beans with floral notes and citrus finish</p>
                <div className="item-tags">
                  <span className="tag">Coffee Seeds</span>
                  <span className="tag">Premium</span>
                  <span className="tag">Light Roast</span>
                </div>
              </div>
              
              <div className="menu-item scale-in stagger-2">
                <div className="item-header">
                  <h4>Colombian Supremo (250g)</h4>
                  <span className="price">Ksh 900</span>
                </div>
                <p className="item-description">Rich, full-bodied Colombian beans with chocolate and nutty notes</p>
                <div className="item-tags">
                  <span className="tag">Coffee Seeds</span>
                  <span className="tag">Medium Roast</span>
                  <span className="tag">Classic</span>
                </div>
              </div>
              
              <div className="menu-item scale-in stagger-3">
                <div className="item-header">
                  <h4>Hikuri House Blend</h4>
                  <span className="price">Ksh 450</span>
                </div>
                <p className="item-description">Our signature medium roast with notes of chocolate and caramel</p>
                <div className="item-tags">
                  <span className="tag">Medium Roast</span>
                  <span className="tag">House Special</span>
                </div>
              </div>
              
              <div className="menu-item scale-in stagger-4">
                <div className="item-header">
                  <h4>Vanilla Latte</h4>
                  <span className="price">Ksh 480</span>
                </div>
                <p className="item-description">Smooth espresso with vanilla syrup and steamed milk</p>
                <div className="item-tags">
                  <span className="tag">Popular</span>
                  <span className="tag">Sweet</span>
                </div>
              </div>
              
              <div className="menu-item scale-in stagger-5">
                <div className="item-header">
                  <h4>Cold Brew</h4>
                  <span className="price">Ksh 420</span>
                </div>
                <p className="item-description">24-hour steeped coffee concentrate served over ice</p>
                <div className="item-tags">
                  <span className="tag">Refreshing</span>
                  <span className="tag">Iced</span>
                </div>
              </div>
              
              <div className="menu-item scale-in stagger-1">
                <div className="item-header">
                  <h4>Cappuccino</h4>
                  <span className="price">Ksh 400</span>
                </div>
                <p className="item-description">Classic Italian espresso with equal parts steamed milk and foam</p>
                <div className="item-tags">
                  <span className="tag">Classic</span>
                  <span className="tag">Foamy</span>
                </div>
              </div>
              
              <div className="menu-item scale-in stagger-2">
                <div className="item-header">
                  <h4>Americano</h4>
                  <span className="price">Ksh 350</span>
                </div>
                <p className="item-description">Espresso diluted with hot water for a smooth, bold flavor</p>
                <div className="item-tags">
                  <span className="tag">Bold</span>
                  <span className="tag">Simple</span>
                </div>
              </div>
            </div>

            <div className="menu-category" id="pastries">
              <div className="menu-item-card scale-in stagger-1">
                <div className="coffee-image-container">
                  <img src={croissantImg} alt="Croissant" className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details">
                      <h3>Croissant</h3>
                      <p className="price">Ksh 280</p>
                    </div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>Croissant</h4>
                  <div className="coffee-meta">
                    <span className="meta-item">Buttery, flaky French pastry baked fresh daily</span>
                  </div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh 280</span>
                    <button className="order-btn" onClick={() => handleOrderNow({
                      name: "Croissant",
                      price: 280,
                      description: "Buttery, flaky French pastry baked fresh daily",
                      category: "pastries"
                    })}>Order Now</button>
                  </div>
                </div>
              </div>
              
              <div className="menu-item-card scale-in stagger-2">
                <div className="coffee-image-container">
                  <img src={blueberryMuffinImg} alt="Blueberry Muffin" className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details">
                      <h3>Blueberry Muffin</h3>
                      <p className="price">Ksh 320</p>
                    </div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>Blueberry Muffin</h4>
                  <div className="coffee-meta">
                    <span className="meta-item">Moist muffin bursting with fresh blueberries</span>
                  </div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh 320</span>
                    <button className="order-btn" onClick={() => handleOrderNow({
                      name: "Blueberry Muffin",
                      price: 320,
                      description: "Moist muffin bursting with fresh blueberries",
                      category: "pastries"
                    })}>Order Now</button>
                  </div>
                </div>
              </div>
              
              <div className="menu-item-card scale-in stagger-3">
                <div className="coffee-image-container">
                  <img src={cinnamonRollImg} alt="Cinnamon Roll" className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details">
                      <h3>Cinnamon Roll</h3>
                      <p className="price">Ksh 350</p>
                    </div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>Cinnamon Roll</h4>
                  <div className="coffee-meta">
                    <span className="meta-item">Sweet roll with cinnamon filling and cream cheese frosting</span>
                  </div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh 350</span>
                    <button className="order-btn" onClick={() => handleOrderNow({
                      name: "Cinnamon Roll",
                      price: 350,
                      description: "Sweet roll with cinnamon filling and cream cheese frosting",
                      category: "pastries"
                    })}>Order Now</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-category" id="bites">
              <div className="menu-item-card scale-in stagger-1">
                <div className="coffee-image-container">
                  <img src={avocadoToastImg} alt="Avocado Toast" className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details">
                      <h3>Avocado Toast</h3>
                      <p className="price">Ksh 550</p>
                    </div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>Avocado Toast</h4>
                  <div className="coffee-meta">
                    <span className="meta-item">Sourdough bread with mashed avocado, poached egg, and herbs</span>
                  </div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh 550</span>
                    <button className="order-btn" onClick={() => handleOrderNow({
                      name: "Avocado Toast",
                      price: 550,
                      description: "Sourdough bread with mashed avocado, poached egg, and herbs",
                      category: "bites"
                    })}>Order Now</button>
                  </div>
                </div>
              </div>
              
              <div className="menu-item-card scale-in stagger-2">
                <div className="coffee-image-container">
                  <img src={grilledCheeseImg} alt="Grilled Cheese" className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details">
                      <h3>Grilled Cheese</h3>
                      <p className="price">Ksh 450</p>
                    </div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>Grilled Cheese</h4>
                  <div className="coffee-meta">
                    <span className="meta-item">Gourmet cheese sandwich on artisan bread</span>
                  </div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh 450</span>
                    <button className="order-btn" onClick={() => handleOrderNow({
                      name: "Grilled Cheese",
                      price: 450,
                      description: "Gourmet cheese sandwich on artisan bread",
                      category: "bites"
                    })}>Order Now</button>
                  </div>
                </div>
              </div>
              
              <div className="menu-item-card scale-in stagger-3">
                <div className="coffee-image-container">
                  <img src={fruitBowlImg} alt="Fruit Bowl" className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details">
                      <h3>Fruit Bowl</h3>
                      <p className="price">Ksh 380</p>
                    </div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>Fruit Bowl</h4>
                  <div className="coffee-meta">
                    <span className="meta-item">Seasonal fresh fruits with honey and granola</span>
                  </div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh 380</span>
                    <button className="order-btn" onClick={() => handleOrderNow({
                      name: "Fruit Bowl",
                      price: 380,
                      description: "Seasonal fresh fruits with honey and granola",
                      category: "bites"
                    })}>Order Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience / Features Section */}
      <section id="features" className="features">
        <div className="container">
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

      {/* Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <h2 className="fade-in" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '3rem' }}>Moments at Hikuri</h2>
          <div className="gallery-grid">
            <div className="gallery-item fade-in stagger-1"><img src={coffeehandImg} alt="Coffee Craft" /></div>
            <div className="gallery-item fade-in stagger-2"><img src={hand2Img} alt="Coffee detail" /></div>
            <div className="gallery-item fade-in stagger-3"><img src={chillImg} alt="Chilled mood" /></div>
            <div className="gallery-item fade-in stagger-4"><img src={in2Img} alt="Interior detail" /></div>
            <div className="gallery-item fade-in stagger-5"><img src={hikuriImg} alt="Hikuri lifestyle" /></div>
            <div className="gallery-item fade-in stagger-1"><img src={hikuri2Img} alt="Hikuri exterior" /></div>
            <div className="gallery-item fade-in stagger-2"><img src={image2Img} alt="Coffee bar" /></div>
            <div className="gallery-item fade-in stagger-3"><img src={tuffImg} alt="Outdoor seating" /></div>
            <div className="gallery-item fade-in stagger-4"><img src={deck2Img} alt="The deck" /></div>
            <div className="gallery-item fade-in stagger-5"><img src={posterImg} alt="Art at Hikuri" /></div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact">
        <div className="container footer-content">
          <div className="footer-section slide-in-left">
            <h4>Location</h4>
            <p>2 James Gichuru Road</p>
            <p>Lavington, Nairobi, Kenya</p>
            <a href="https://maps.app.goo.gl/5UpXDbYcdiXreQyi8" target="_blank" rel="noreferrer" style={{color: 'white', fontSize: '0.8rem'}}>View on Google Maps</a>
          </div>
          <div className="footer-section fade-in">
            <h4>Hours</h4>
            <p>Mon - Sun: 8:00 AM - 6:00 PM</p>
          </div>
          <div className="footer-section slide-in-right">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://instagram.com/hikuricoffee" target="_blank" rel="noreferrer" className="hover-lift">Instagram</a>
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
