import React from 'react';

function Footer() {
  return (
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
            <a href="https://instagram.com/hikuricoffee" target="_blank" rel="noreferrer" className="hover-lift">Instagram</a>
          </div>
          <p style={{marginTop: '10px', fontSize: '0.9rem'}}>2,890 Followers</p>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Hikuri Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
