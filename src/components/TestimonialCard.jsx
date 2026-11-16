import React from 'react';
import { Star, Quote } from './Icons.jsx';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote-icon">
        <Quote size={28} />
      </div>
      <div className="testimonial-stars">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
        ))}
      </div>
      <p className="testimonial-comment">"{testimonial.comment}"</p>
      <div className="testimonial-author">
        <div className="author-avatar">
          {testimonial.name.charAt(0)}
        </div>
        <div className="author-info">
          <h4 className="author-name">{testimonial.name}</h4>
          <p className="author-meta">
            {testimonial.role} • <span>{testimonial.country}</span>
          </p>
          <span className="stay-suite-tag">Stayed in: {testimonial.roomStayed}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
