import React from 'react';
import { Link } from '../router.jsx';
import { Hotel, Mail, Phone, MapPin, ShieldCheck, Award, ArrowUp } from './Icons.jsx';
import { hotelInfo } from '../data/hotelData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-luxury">
      <div className="container footer-grid">
        {/* Column 1: Brand Info */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <Hotel className="footer-logo-icon" size={32} />
            <div>
              <h3 className="footer-brand-title">GRAND HORIZON</h3>
              <p className="footer-brand-tagline">HOTEL & LUXURY SUITES</p>
            </div>
          </div>
          <p className="footer-desc">
            An oasis of understated coastal opulence, delivering world-class hospitality, refined suites, and Michelin-inspired culinary memories since 2014.
          </p>
          <div className="footer-accreditations">
            <span className="accreditation-pill">
              <Award size={14} /> 5-Star Diamond Award
            </span>
            <span className="accreditation-pill">
              <ShieldCheck size={14} /> Certified Eco-Luxury
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home Overview</Link></li>
            <li><Link to="/about">Our Heritage & Story</Link></li>
            <li><Link to="/rooms">Luxury Suites & Rates</Link></li>
            <li><Link to="/contact">Concierge & Contact</Link></li>
            <li><Link to="/my-bookings">Manage My Bookings</Link></li>
          </ul>
        </div>

        {/* Column 3: Exclusive Amenities */}
        <div className="footer-col">
          <h4 className="footer-heading">Signature Services</h4>
          <ul className="footer-links">
            <li><span>The Horizon Spa & Steam</span></li>
            <li><span>L'Horizon Michelin Dining</span></li>
            <li><span>Private Chauffeur Limousine</span></li>
            <li><span>Panoramic Marina Infinity Pool</span></li>
            <li><span>Bespoke Weddings & Banquets</span></li>
          </ul>
        </div>

        {/* Column 4: Contact & Concierge */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Direct Concierge</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>{hotelInfo.address}</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>{hotelInfo.phone}</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>{hotelInfo.email}</span>
            </li>
          </ul>

          <div className="footer-hours">
            <strong>Check-in:</strong> {hotelInfo.checkInTime} &nbsp;|&nbsp; <strong>Check-out:</strong> {hotelInfo.checkOutTime}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p className="copyright-text">
            © {new Date().getFullYear()} {hotelInfo.name}. All Rights Reserved. Built with React JS for New Horizon Practical Project.
          </p>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Scroll back to top">
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
