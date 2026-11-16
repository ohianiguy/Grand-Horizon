import React, { useState } from 'react';
import { NavLink, Link } from '../router.jsx';
import { useBooking } from '../context/BookingContext';
import { Menu, X, Hotel, Heart, CalendarCheck, PhoneCall } from './Icons.jsx';
import { hotelInfo } from '../data/hotelData';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { bookings, favorites } = useBooking();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      {/* Top utility bar */}
      <div className="navbar-topbar">
        <div className="container topbar-content">
          <div className="topbar-left">
            <span>✨ Welcome to 5-Star Waterfront Luxury</span>
            <span className="topbar-separator">•</span>
            <span className="topbar-phone">
              <PhoneCall size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              24/7 Concierge: {hotelInfo.phone}
            </span>
          </div>
          <div className="topbar-right">
            <span className="topbar-badge">Best Rate Guarantee</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="navbar-main">
        <div className="container nav-content">
          {/* Logo */}
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            <div className="logo-icon-wrap">
              <Hotel size={28} className="logo-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-title">GRAND HORIZON</span>
              <span className="brand-subtitle">HOTEL & LUXURY SUITES</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links desktop-only">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Rooms & Suites
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                My Bookings
                {bookings.length > 0 && (
                  <span className="counter-badge bookings-badge">{bookings.length}</span>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Actions: Favorites & Book CTA */}
          <div className="nav-actions desktop-only">
            <Link to="/rooms" className="nav-favorites-btn" title="Saved Favorites">
              <Heart size={20} className={favorites.length > 0 ? "heart-filled" : ""} />
              {favorites.length > 0 && (
                <span className="counter-badge fav-badge">{favorites.length}</span>
              )}
            </Link>
            <Link to="/rooms" className="btn-primary-luxury">
              <CalendarCheck size={16} />
              <span>Book A Suite</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="mobile-toggle-btn mobile-only"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <ul className="mobile-nav-links">
              <li>
                <NavLink to="/" end onClick={closeMobileMenu} className="mobile-nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={closeMobileMenu} className="mobile-nav-link">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/rooms" onClick={closeMobileMenu} className="mobile-nav-link">
                  Rooms & Suites
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={closeMobileMenu} className="mobile-nav-link">
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-bookings" onClick={closeMobileMenu} className="mobile-nav-link">
                  My Bookings ({bookings.length})
                </NavLink>
              </li>
            </ul>
            <div className="mobile-menu-actions">
              <Link to="/rooms" onClick={closeMobileMenu} className="btn-primary-luxury full-width">
                <CalendarCheck size={18} />
                <span>Book A Suite Now</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
