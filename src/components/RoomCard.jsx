import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Heart, Users, BedDouble, Maximize2, Star, Check, CalendarCheck, CheckCircle2 } from './Icons.jsx';

const RoomCard = ({ room }) => {
  const { isFavorite, toggleFavorite, openBookingModal } = useBooking();
  const favorited = isFavorite(room.id);

  return (
    <article className="room-card">
      {/* Image container with category badge & favorite button */}
      <div className="room-card-media">
        <img src={room.image} alt={room.name} className="room-image" loading="lazy" />
        <div className="room-media-overlay"></div>
        <span className="room-category-badge">{room.category}</span>
        <button
          className={`favorite-btn ${favorited ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(room.id);
          }}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          title={favorited ? 'In your favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={favorited ? '#e63946' : 'none'} color={favorited ? '#e63946' : '#ffffff'} />
        </button>
      </div>

      {/* Card Body */}
      <div className="room-card-body">
        {/* Rating and review count */}
        <div className="room-rating-row">
          <div className="rating-pill">
            <Star size={14} className="star-icon" fill="#D4AF37" color="#D4AF37" />
            <span className="rating-value">{room.rating}</span>
            <span className="reviews-count">({room.reviewsCount} reviews)</span>
          </div>
          <span className="room-view-label">{room.view}</span>
        </div>

        {/* Room Title & Tagline */}
        <h3 className="room-title">{room.name}</h3>
        <p className="room-tagline">{room.tagline}</p>

        {/* Room Specifications grid */}
        <div className="room-specs-grid">
          <div className="spec-item">
            <Users size={16} className="spec-icon" />
            <span>Up to {room.capacity} Guests</span>
          </div>
          <div className="spec-item">
            <BedDouble size={16} className="spec-icon" />
            <span>{room.bedType}</span>
          </div>
          <div className="spec-item">
            <Maximize2 size={16} className="spec-icon" />
            <span>{room.size}</span>
          </div>
        </div>

        {/* Highlights Amenities */}
        <div className="room-amenities-list">
          {room.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="amenity-tag">
              <Check size={12} className="amenity-check" />
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="amenity-tag more-tag">+{room.amenities.length - 3} more</span>
          )}
        </div>

        {/* Footer: Availability Status & Book Room CTA */}
        <div className="room-card-footer">
          <div className="room-status-wrap">
            <span className="status-badge-available">
              <CheckCircle2 size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Available to Reserve
            </span>
            <span className="amenity-note">Complimentary Breakfast Included</span>
          </div>

          <button
            className="btn-book-room"
            onClick={() => openBookingModal(room)}
          >
            <CalendarCheck size={16} />
            <span>Book Room</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default RoomCard;
