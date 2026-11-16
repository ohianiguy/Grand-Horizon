import React, { useState } from 'react';
import { Link } from '../router.jsx';
import QuickSearch from '../components/QuickSearch';
import RoomCard from '../components/RoomCard';
import TestimonialCard from '../components/TestimonialCard';
import { roomsData } from '../data/roomsData';
import { hotelInfo, testimonials } from '../data/hotelData';
import {
  Sparkles,
  Award,
  ShieldCheck,
  Compass,
  UtensilsCrossed,
  Waves,
  HeartHandshake,
  ArrowRight
} from '../components/Icons.jsx';

const Home = () => {
  // Interactive state: filter featured rooms by category
  const [featuredFilter, setFeaturedFilter] = useState('All');

  const categories = ['All', 'Deluxe', 'Executive', 'Penthouse', 'Suites'];

  const filteredFeatured = roomsData.filter((room) => {
    if (featuredFilter === 'All') return true;
    return room.category === featuredFilter;
  });

  return (
    <div className="page-home">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-backdrop-overlay"></div>
        <div className="container hero-content">
          <div className="hero-badge">
            <Sparkles size={16} className="sparkle-icon" />
            <span>5-Star Luxury Oceanfront Retreat</span>
          </div>

          <h1 className="hero-title">
            Where Coastal Grandeur <br />
            <span className="gold-gradient-text">Meets Timeless Luxury</span>
          </h1>

          <p className="hero-subtitle">
            Welcome to {hotelInfo.name}. Immerse yourself in breathtaking waterfront views, 
            fine dining, and comfortable accommodations designed for your peaceful stay.
          </p>

          <div className="hero-cta-group">
            <Link to="/rooms" className="btn-primary-hero">
              <span>Explore All Rooms</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn-secondary-hero">
              <span>Our Story & Heritage</span>
            </Link>
          </div>

          {/* Quick Stats in Hero */}
          <div className="hero-features-bar">
            <div className="feature-pill">
              <Award size={18} className="feature-icon" />
              <span>World Luxury Hotel Winner</span>
            </div>
            <div className="feature-pill">
              <Waves size={18} className="feature-icon" />
              <span>Heated Infinity Marina Pool</span>
            </div>
            <div className="feature-pill">
              <ShieldCheck size={18} className="feature-icon" />
              <span>Verified Guest Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SEARCH WIDGET (Interactive Component) */}
      <section className="quick-search-section container">
        <QuickSearch />
      </section>

      {/* WELCOME / INTRO SECTION */}
      <section className="welcome-section container section-padding">
        <div className="welcome-grid">
          <div className="welcome-text-col">
            <span className="section-eyebrow">Discover {hotelInfo.shortName}</span>
            <h2 className="section-title">
              An Architectural Masterpiece on the Prestigious Marina Waterfront
            </h2>
            <p className="welcome-paragraph">
              {hotelInfo.description}
            </p>
            <p className="welcome-paragraph">
              Whether you are escaping for an intimate holiday retreat, hosting a business meeting, 
              or relaxing with family, our team is dedicated to giving you an exceptional experience.
            </p>

            <div className="welcome-highlights-grid">
              <div className="welcome-highlight">
                <div className="highlight-icon-wrap">
                  <UtensilsCrossed size={22} />
                </div>
                <div>
                  <h4>Gourmet Restaurant</h4>
                  <p>Delicious breakfast, lunch, and dinner with coastal flavors.</p>
                </div>
              </div>

              <div className="welcome-highlight">
                <div className="highlight-icon-wrap">
                  <Compass size={22} />
                </div>
                <div>
                  <h4>Prime Marina Location</h4>
                  <p>Peaceful seaside views and direct waterfront access.</p>
                </div>
              </div>

              <div className="welcome-highlight">
                <div className="highlight-icon-wrap">
                  <HeartHandshake size={22} />
                </div>
                <div>
                  <h4>24/7 Guest Service</h4>
                  <p>Helpful staff ready to assist with any request anytime.</p>
                </div>
              </div>

              <div className="welcome-highlight">
                <div className="highlight-icon-wrap">
                  <Waves size={22} />
                </div>
                <div>
                  <h4>Relaxing Spa & Pool</h4>
                  <p>Refreshing swimming pool and soothing wellness spa treatments.</p>
                </div>
              </div>
            </div>

            <div className="welcome-cta">
              <Link to="/about" className="btn-outline-gold">
                <span>Learn More About Our Heritage</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="welcome-visual-col">
            <div className="image-stack">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Hotel Exterior and Pool"
                className="image-primary"
              />
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80"
                alt="Hotel Spa Wellness"
                className="image-secondary"
              />
              <div className="experience-badge">
                <span className="badge-number">12+</span>
                <span className="badge-text">Years of Hospitality Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS COUNTER STRIP */}
      <section className="stats-strip">
        <div className="container stats-grid">
          {hotelInfo.stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-number">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ROOMS & SUITES SECTION */}
      <section className="featured-rooms-section container section-padding">
        <div className="section-header-centered">
          <span className="section-eyebrow">Accommodations</span>
          <h2 className="section-title">Featured Rooms & Suites</h2>
          <p className="section-subtitle">
            Every room is designed with comfortable bedding, modern furnishings, and relaxing views.
          </p>

          {/* Interactive filter buttons */}
          <div className="category-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill-btn ${featuredFilter === cat ? 'active' : ''}`}
                onClick={() => setFeaturedFilter(cat)}
              >
                {cat === 'All' ? 'All Rooms' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Room Cards Grid using .map() */}
        <div className="rooms-grid">
          {filteredFeatured.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        <div className="view-all-rooms-wrap">
          <Link to="/rooms" className="btn-primary-luxury large">
            <span>View All Rooms & Suites</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* AMENITIES SHOWCASE */}
      <section className="amenities-showcase section-padding">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Hotel Facilities</span>
            <h2 className="section-title">Curated For Your Comfort</h2>
            <p className="section-subtitle">
              Enjoy our array of facilities designed to make your stay soothing and delightful.
            </p>
          </div>

          <div className="amenities-grid">
            <div className="amenity-feature-box">
              <div className="amenity-box-image">
                <img
                  src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=700&q=80"
                  alt="Waterfront Pool"
                />
              </div>
              <div className="amenity-box-content">
                <h3>Horizon Swimming Pool</h3>
                <p>Overlooking the marina waters with temperature control, shaded cabanas, and fresh drinks.</p>
              </div>
            </div>

            <div className="amenity-feature-box">
              <div className="amenity-box-image">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=700&q=80"
                  alt="Hydrotherapy Spa"
                />
              </div>
              <div className="amenity-box-content">
                <h3>Thermal & Body Spa</h3>
                <p>Revitalizing massages, steam chambers, and therapeutic treatments for complete relaxation.</p>
              </div>
            </div>

            <div className="amenity-feature-box">
              <div className="amenity-box-image">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80"
                  alt="Fine Dining"
                />
              </div>
              <div className="amenity-box-content">
                <h3>L'Horizon Restaurant</h3>
                <p>Exceptional culinary craftsmanship featuring fresh local catches, steaks, and buffet breakfast.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUEST TESTIMONIALS */}
      <section className="testimonials-section container section-padding">
        <div className="section-header-centered">
          <span className="section-eyebrow">Guest Experiences</span>
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle">
            Read what visitors, couples, and travelers share about their stay with us.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="cta-banner-section container">
        <div className="cta-banner-inner">
          <div className="cta-text">
            <span className="cta-badge">Easy Online Reservation</span>
            <h2>Plan Your Relaxing Getaway Today</h2>
            <p>Select your favorite room and submit a reservation request in just a few clicks.</p>
          </div>
          <div className="cta-action">
            <Link to="/rooms" className="btn-cta-gold">
              <span>Reserve A Room</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
