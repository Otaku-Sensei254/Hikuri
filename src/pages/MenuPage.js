import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import andromedaCoffeeImg from '../images/andromeda-coffee.jpg';
import redrumCoffeeImg from '../images/redrum-coffee.jpg';
import apexCoffeeImg from '../images/apex-coffee.jpg';
import acrewoodCoffeeImg from '../images/acrewood-coffee.jpg';
import kojiSakeCoffeeImg from '../images/koji-sake-coffee.jpg';
import croissantImg from '../images/croissant.jpg';
import blueberryMuffinImg from '../images/blueberry-muffin.jpg';
import cinnamonRollImg from '../images/cinnamon-roll.jpg';
import avocadoToastImg from '../images/avocado-toast.jpg';
import grilledCheeseImg from '../images/grilled-cheese.jpg';
import fruitBowlImg from '../images/fruit-bowl.jpg';

const pourOverMenu = [
  { name: "ANDROMEDA", farm: "South of the Rift Coffees", region: "Rongo", varietal: "Riuru 11", process: "Lacto Washed", characteristics: "Clean & Smooth", price: 650, image: andromedaCoffeeImg },
  { name: "REDRUM", farm: "Kahira-ini factory", region: "Mathira North, Nyeri", varietal: "Batian, Ruiru II", process: "Natural", characteristics: "Silky & Sweet", price: 650, image: redrumCoffeeImg },
  { name: "APEX", farm: "Rift Valley Coffee", region: "Nandi County", varietal: "Batian + Ruiru 11", process: "Natural Anaerobic", characteristics: "Bright & Fruity", price: 550, image: apexCoffeeImg },
  { name: "100 ACRE WOOD", farm: "Ngacha Coffee Estate", region: "Kirinyaga", varietal: "SL28/34", process: "Yellow Honey", characteristics: "Complex & Intense", price: 800, image: acrewoodCoffeeImg },
  { name: "KOJI SAKE", farm: "South of the Rift Coffees", region: "Rongo", varietal: "Riuru 11", process: "Anaerobic Natural with Koji Inoculation", characteristics: "Tangy & Boozy", price: 650, image: kojiSakeCoffeeImg },
];

function MenuPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const cats = document.querySelectorAll('.menu-category');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.category;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        cats.forEach(cat => {
          cat.classList.remove('active');
          if (cat.id === target) {
            cat.classList.add('active');
            cat.querySelectorAll('.menu-item, .menu-item-card').forEach((item, i) => {
              item.style.animation = 'none';
              setTimeout(() => { item.style.animation = ''; }, i * 100);
            });
          }
        });
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in, .scale-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="menu">
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
            {pourOverMenu.map((c, i) => (
              <div key={c.name} className={`menu-item-card scale-in stagger-${(i % 6) + 1}`}>
                <div className="coffee-image-container">
                  <img src={c.image} alt={c.name} className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details">
                      <h3>{c.name}</h3>
                      <p className="price">Ksh {c.price}</p>
                    </div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>{c.name}</h4>
                  <div className="coffee-meta">
                    <span className="meta-item"><strong>Farm:</strong> {c.farm}</span>
                    <span className="meta-item"><strong>Region:</strong> {c.region}</span>
                    <span className="meta-item"><strong>Varietal:</strong> {c.varietal}</span>
                    <span className="meta-item"><strong>Process:</strong> {c.process}</span>
                    <span className="meta-item characteristics"><strong>Taste:</strong> {c.characteristics}</span>
                  </div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh {c.price}</span>
                    <button className="order-btn" onClick={() => navigate('/order', { state: { selectedItem: c } })}>Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="menu-category" id="coffee">
            {[
              { name: 'Hikuri House Blend (250g)', price: 850, desc: 'Take home our signature medium roast with notes of chocolate and caramel', tags: ['Coffee Seeds', 'Packaging', 'Popular'] },
              { name: 'Single Origin Ethiopia (250g)', price: 950, desc: 'Bright and fruity single origin beans with floral notes and citrus finish', tags: ['Coffee Seeds', 'Premium', 'Light Roast'] },
              { name: 'Colombian Supremo (250g)', price: 900, desc: 'Rich, full-bodied Colombian beans with chocolate and nutty notes', tags: ['Coffee Seeds', 'Medium Roast', 'Classic'] },
              { name: 'Hikuri House Blend', price: 450, desc: 'Our signature medium roast with notes of chocolate and caramel', tags: ['Medium Roast', 'House Special'] },
              { name: 'Vanilla Latte', price: 480, desc: 'Smooth espresso with vanilla syrup and steamed milk', tags: ['Popular', 'Sweet'] },
              { name: 'Cold Brew', price: 420, desc: '24-hour steeped coffee concentrate served over ice', tags: ['Refreshing', 'Iced'] },
              { name: 'Cappuccino', price: 400, desc: 'Classic Italian espresso with equal parts steamed milk and foam', tags: ['Classic', 'Foamy'] },
              { name: 'Americano', price: 350, desc: 'Espresso diluted with hot water for a smooth, bold flavor', tags: ['Bold', 'Simple'] },
            ].map((item, i) => (
              <div key={item.name} className="menu-item scale-in">
                <div className="item-header">
                  <h4>{item.name}</h4>
                  <span className="price">Ksh {item.price}</span>
                </div>
                <p className="item-description">{item.desc}</p>
                <div className="item-tags">
                  {item.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="menu-category" id="pastries">
            {[
              { name: 'Croissant', price: 280, desc: 'Buttery, flaky French pastry baked fresh daily', img: croissantImg },
              { name: 'Blueberry Muffin', price: 320, desc: 'Moist muffin bursting with fresh blueberries', img: blueberryMuffinImg },
              { name: 'Cinnamon Roll', price: 350, desc: 'Sweet roll with cinnamon filling and cream cheese frosting', img: cinnamonRollImg },
            ].map((item, i) => (
              <div key={item.name} className="menu-item-card scale-in">
                <div className="coffee-image-container">
                  <img src={item.img} alt={item.name} className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details"><h3>{item.name}</h3><p className="price">Ksh {item.price}</p></div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>{item.name}</h4>
                  <div className="coffee-meta"><span className="meta-item">{item.desc}</span></div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh {item.price}</span>
                    <button className="order-btn" onClick={() => navigate('/order', { state: { selectedItem: { name: item.name, price: item.price, description: item.desc, category: 'pastries' } } })}>Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="menu-category" id="bites">
            {[
              { name: 'Avocado Toast', price: 550, desc: 'Sourdough bread with mashed avocado, poached egg, and herbs', img: avocadoToastImg },
              { name: 'Grilled Cheese', price: 450, desc: 'Gourmet cheese sandwich on artisan bread', img: grilledCheeseImg },
              { name: 'Fruit Bowl', price: 380, desc: 'Seasonal fresh fruits with honey and granola', img: fruitBowlImg },
            ].map((item, i) => (
              <div key={item.name} className="menu-item-card scale-in">
                <div className="coffee-image-container">
                  <img src={item.img} alt={item.name} className="coffee-image" />
                  <div className="coffee-overlay">
                    <div className="coffee-details"><h3>{item.name}</h3><p className="price">Ksh {item.price}</p></div>
                  </div>
                </div>
                <div className="coffee-info">
                  <h4>{item.name}</h4>
                  <div className="coffee-meta"><span className="meta-item">{item.desc}</span></div>
                  <div className="coffee-footer">
                    <span className="price-tag">Ksh {item.price}</span>
                    <button className="order-btn" onClick={() => navigate('/order', { state: { selectedItem: { name: item.name, price: item.price, description: item.desc, category: 'bites' } } })}>Order Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MenuPage;
