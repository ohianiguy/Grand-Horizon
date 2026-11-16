import React from 'react';
import { Link } from '../router.jsx';
import { hotelInfo, hotelValues, leadershipTeam } from '../data/hotelData';
import {
  ShieldCheck,
  HeartHandshake,
  Leaf,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Compass,
  ArrowRight
} from '../components/Icons.jsx';

const About = () => {
  const iconMap = {
    ShieldCheck: <ShieldCheck size={28} className="value-icon" />,
    HeartHandshake: <HeartHandshake size={28} className="value-icon" />,
    Leaf: <Leaf size={28} className="value-icon" />,
    Award: <Award size={28} className="value-icon" />
  };

  const milestones = [
    {
      year: '2014',
      title: 'Foundation & Vision',
      desc: 'Grand Horizon opens its doors with 60 bespoke suites and an ambition to pioneer world-class coastal hospitality in West Africa.'
    },
    {
      year: '2017',
      title: '5-Star Diamond Accolade',
      desc: 'Awarded official Five-Star status and inducted into the Prestige Global Luxury Hotels coalition.'
    },
    {
      year: '2021',
      title: 'Architectural Expansion & Spa',
      desc: 'Unveiled the Presidential Penthouse wing and the 1,500m² Horizon Thermal & Hydrotherapy Wellness Pavilion.'
    },
    {
      year: '2026',
      title: 'Green Eco-Sanctuary Benchmark',
      desc: 'Achieved 100% solar auxiliary energy integration, zero single-use plastics, and marine conservation partnership.'
    }
  ];

  return (
    <div className="page-about">
      {/* PAGE BANNER */}
      <section className="about-hero-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="banner-eyebrow">Our Heritage & Distinction</span>
          <h1 className="banner-title">Crafting Unforgettable Moments Since 2014</h1>
          <p className="banner-desc">
            A sanctuary where timeless architectural elegance harmonizes with warm, authentic West African hospitality and coastal serenity.
          </p>
        </div>
      </section>

      {/* STORY & HERITAGE */}
      <section className="about-story-section container section-padding">
        <div className="story-grid">
          <div className="story-media-col">
            <div className="story-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
                alt="Grand Horizon Hotel Grand Lobby"
                className="story-main-img"
              />
              <div className="story-floating-card">
                <span className="floating-number">12+</span>
                <span className="floating-text">Years of Architectural & Service Excellence</span>
              </div>
            </div>
          </div>

          <div className="story-text-col">
            <span className="section-eyebrow">The Grand Horizon Story</span>
            <h2 className="section-title">Rooted in Passion, Driven by Perfection</h2>
            <p className="story-p">
              Founded in 2014 along the sparkling waterfront of Lagos Marina, Grand Horizon Hotel & Suites was born from a singular vision: to create a premier haven where discerning international travelers and local guests could experience the gold standard in bespoke hospitality.
            </p>
            <p className="story-p">
              Over the past decade, we have grown from an ambitious boutique property into an award-winning landmark, renowned for our soaring architecture, panoramic ocean vistas, Michelin-inspired cuisine, and intuitive personal service.
            </p>
            <p className="story-p">
              Every detail—from the selection of hand-loomed Egyptian linens to the aroma of coastal botanicals welcoming you at the entrance—is curated to make your stay extraordinary.
            </p>

            <div className="story-checklist">
              <div className="check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Individually curated suites with custom Italian furnishings</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Certified Les Clefs d’Or international 24/7 concierge</span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} className="check-icon" />
                <span>Pioneering sustainable and carbon-conscious hospitality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION, VISION & OBJECTIVES */}
      <section className="mission-vision-section section-padding">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mv-card mission-card">
              <div className="mv-icon-wrap">
                <Compass size={32} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide every guest with an elevated sanctuary of luxury, comfort, and personalized care, anticipating needs before they arise and delivering transformative hospitality experiences that linger long in memory.
              </p>
            </div>

            <div className="mv-card vision-card">
              <div className="mv-icon-wrap">
                <Sparkles size={32} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be universally recognized as the beacon of African luxury hospitality—setting the global benchmark for bespoke service, culinary artistry, architectural beauty, and environmental stewardship.
              </p>
            </div>

            <div className="mv-card objectives-card">
              <div className="mv-icon-wrap">
                <Award size={32} />
              </div>
              <h3>Core Objectives</h3>
              <p>
                To continually innovate our guest experiences, foster a culture of deep empathy and respect, support local coastal artisans and sustainable fisheries, and maintain flawless quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="values-section container section-padding">
        <div className="section-header-centered">
          <span className="section-eyebrow">Our Guiding Principles</span>
          <h2 className="section-title">The Values That Define Us</h2>
          <p className="section-subtitle">
            Every interaction at Grand Horizon is anchored in our enduring pillars of excellence and integrity.
          </p>
        </div>

        <div className="values-grid">
          {hotelValues.map((val, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon-box">
                {iconMap[val.icon] || <ShieldCheck size={28} className="value-icon" />}
              </div>
              <h3 className="value-title">{val.title}</h3>
              <p className="value-desc">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE / MILESTONES */}
      <section className="milestones-section container section-padding">
        <div className="section-header-centered">
          <span className="section-eyebrow">Our Journey</span>
          <h2 className="section-title">A Decade of Milestones</h2>
          <p className="section-subtitle">
            Key moments that shaped our journey from a vision to an international standard of luxury.
          </p>
        </div>

        <div className="timeline-wrapper">
          {milestones.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-marker">
                <Calendar size={18} />
              </div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h4 className="timeline-title">{item.title}</h4>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP & EXECUTIVE TEAM */}
      <section className="leadership-section container section-padding">
        <div className="section-header-centered">
          <span className="section-eyebrow">Leadership</span>
          <h2 className="section-title">The Artisans of Hospitality</h2>
          <p className="section-subtitle">
            Meet the experienced visionaries leading our passionate culinary, wellness, and guest service teams.
          </p>
        </div>

        <div className="leadership-grid">
          {leadershipTeam.map((leader, idx) => (
            <div key={idx} className="leader-card">
              <div className="leader-media">
                <img src={leader.image} alt={leader.name} className="leader-image" loading="lazy" />
              </div>
              <div className="leader-info">
                <h4 className="leader-name">{leader.name}</h4>
                <p className="leader-role">{leader.role}</p>
                <p className="leader-bio">{leader.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container about-cta-wrapper">
        <div className="about-cta-box">
          <h2>Ready to Experience Grand Horizon in Person?</h2>
          <p>Book your upcoming stay or reach out to our VIP concierge team for personalized requests.</p>
          <div className="about-cta-buttons">
            <Link to="/rooms" className="btn-primary-luxury">
              <span>View Accommodations</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary">
              <span>Contact Concierge</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
