import React from 'react';
import { Sparkles, CheckCircle2, Clock } from './Icons.jsx';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <div className="service-media">
        <img src={service.image} alt={service.title} className="service-image" loading="lazy" />
        <span className="service-category-badge">{service.category}</span>
      </div>
      <div className="service-content">
        <div className="service-header">
          <h3 className="service-title">{service.title}</h3>
          <span className="service-pricing">
            <Clock size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            {service.availability}
          </span>
        </div>
        <p className="service-description">{service.description}</p>
        <ul className="service-highlights">
          {service.highlights.map((h, i) => (
            <li key={i} className="service-highlight-item">
              <CheckCircle2 size={15} className="highlight-icon" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceCard;
