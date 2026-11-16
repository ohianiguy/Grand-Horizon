import React, { useState } from 'react';
import { useNavigate } from '../router.jsx';
import { useBooking } from '../context/BookingContext';
import { Calendar, Users, Home, Search, ArrowRight } from './Icons.jsx';

const QuickSearch = () => {
  const navigate = useNavigate();
  const { searchCriteria, setSearchCriteria } = useBooking();

  // Helper to format date YYYY-MM-DD
  const getFormattedDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    checkIn: searchCriteria.checkIn || getFormattedDate(1),
    checkOut: searchCriteria.checkOut || getFormattedDate(4),
    guests: searchCriteria.guests || '2 Guests',
    roomType: searchCriteria.roomType || 'All'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCriteria(formData);
    navigate('/rooms');
  };

  return (
    <div className="quick-search-wrapper">
      <form className="quick-search-form" onSubmit={handleSubmit}>
        {/* Check-In */}
        <div className="search-field-group">
          <label className="search-label" htmlFor="checkIn">
            <Calendar size={16} className="search-icon" />
            <span>Check-in Date</span>
          </label>
          <input
            id="checkIn"
            type="date"
            name="checkIn"
            value={formData.checkIn}
            min={getFormattedDate(0)}
            onChange={handleChange}
            className="search-input"
            required
          />
        </div>

        {/* Check-Out */}
        <div className="search-field-group">
          <label className="search-label" htmlFor="checkOut">
            <Calendar size={16} className="search-icon" />
            <span>Check-out Date</span>
          </label>
          <input
            id="checkOut"
            type="date"
            name="checkOut"
            value={formData.checkOut}
            min={formData.checkIn || getFormattedDate(1)}
            onChange={handleChange}
            className="search-input"
            required
          />
        </div>

        {/* Guests */}
        <div className="search-field-group">
          <label className="search-label" htmlFor="guests">
            <Users size={16} className="search-icon" />
            <span>Number of Guests</span>
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="search-select"
          >
            <option value="1 Guest">1 Guest</option>
            <option value="2 Guests">2 Guests</option>
            <option value="3 Guests">3 Guests</option>
            <option value="4+ Guests">4+ Guests / Family</option>
          </select>
        </div>

        {/* Room Type */}
        <div className="search-field-group">
          <label className="search-label" htmlFor="roomType">
            <Home size={16} className="search-icon" />
            <span>Room Type</span>
          </label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="search-select"
          >
            <option value="All">All Room Types</option>
            <option value="Deluxe">Deluxe Room</option>
            <option value="Executive">Executive Suite</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Villa">Garden Villa</option>
          </select>
        </div>

        {/* Submit CTA */}
        <div className="search-submit-group">
          <button type="submit" className="btn-search-submit">
            <Search size={18} />
            <span>Check Availability</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickSearch;
