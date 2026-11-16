import React, { useState, useEffect } from 'react';
import { useNavigate } from '../router.jsx';
import { useBooking } from '../context/BookingContext';
import { X, Calendar, User, Mail, Phone, Clock, ShieldCheck, CheckCircle } from './Icons.jsx';

const BookingModal = () => {
  const { activeModalRoom, closeBookingModal, addBooking } = useBooking();
  const navigate = useNavigate();

  // Helper date
  const getFormattedDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: getFormattedDate(1),
    checkOut: getFormattedDate(3),
    guests: '2',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [nights, setNights] = useState(2);

  // Calculate nights whenever dates change
  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const start = new Date(form.checkIn);
      const end = new Date(form.checkOut);
      const diffTime = end - start;
      const calcNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      setNights(calcNights);
    }
  }, [form.checkIn, form.checkOut]);

  if (!activeModalRoom) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required for booking confirmation';
    }

    if (new Date(form.checkOut) <= new Date(form.checkIn)) {
      newErrors.checkOut = 'Check-out date must be after check-in date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addBooking({
      room: activeModalRoom,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
      nights: nights,
      specialRequests: form.specialRequests,
      status: 'Confirmed'
    });

    closeBookingModal();
    navigate('/my-bookings');
  };

  return (
    <div className="modal-backdrop" onClick={closeBookingModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-pre-title">Room Reservation</span>
            <h2 className="modal-title">{activeModalRoom.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={closeBookingModal} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Room Summary Card */}
          <div className="modal-room-summary">
            <img src={activeModalRoom.image} alt={activeModalRoom.name} className="modal-room-thumb" />
            <div className="modal-room-info">
              <span className="modal-category">{activeModalRoom.category}</span>
              <p className="modal-view"><strong>View:</strong> {activeModalRoom.view}</p>
              <p className="modal-view"><strong>Bed:</strong> {activeModalRoom.bedType}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="modal-booking-form">
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="modal-name">
                  <User size={14} /> Full Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  name="fullName"
                  placeholder="e.g. John Doe"
                  value={form.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="modal-email">
                  <Mail size={14} /> Email Address *
                </label>
                <input
                  id="modal-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="modal-phone">
                  <Phone size={14} /> Phone / WhatsApp *
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  name="phone"
                  placeholder="+234 812 345 6789"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="modal-guests">
                  <User size={14} /> Number of Guests
                </label>
                <select id="modal-guests" name="guests" value={form.guests} onChange={handleChange}>
                  {[...Array(activeModalRoom.capacity)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'} (Max {activeModalRoom.capacity})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="modal-checkin">
                  <Calendar size={14} /> Check-in Date *
                </label>
                <input
                  id="modal-checkin"
                  type="date"
                  name="checkIn"
                  min={getFormattedDate(0)}
                  value={form.checkIn}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-checkout">
                  <Calendar size={14} /> Check-out Date *
                </label>
                <input
                  id="modal-checkout"
                  type="date"
                  name="checkOut"
                  min={form.checkIn || getFormattedDate(1)}
                  value={form.checkOut}
                  onChange={handleChange}
                  className={errors.checkOut ? 'input-error' : ''}
                />
                {errors.checkOut && <span className="error-text">{errors.checkOut}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-requests">Special Requests (Optional)</label>
              <textarea
                id="modal-requests"
                name="specialRequests"
                rows="2"
                placeholder="High floor preference, late arrival time, quiet room..."
                value={form.specialRequests}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Stay Summary */}
            <div className="modal-price-breakdown">
              <div className="breakdown-row">
                <span>Selected Room:</span>
                <strong>{activeModalRoom.name}</strong>
              </div>
              <div className="breakdown-row">
                <span>Duration of Stay:</span>
                <strong>{nights} {nights === 1 ? 'Night' : 'Nights'}</strong>
              </div>
              <div className="breakdown-row">
                <span>Reservation Type:</span>
                <span className="free-badge">Direct Hotel Booking</span>
              </div>
            </div>

            <div className="modal-guarantee">
              <ShieldCheck size={16} />
              <span>Instant confirmation reservation. No upfront payment required.</span>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={closeBookingModal}>
                Cancel
              </button>
              <button type="submit" className="btn-confirm-booking">
                <CheckCircle size={18} />
                <span>Confirm Reservation</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
