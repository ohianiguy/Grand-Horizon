import React, { useState } from 'react';
import { hotelInfo, faqs } from '../data/hotelData';
import { useBooking } from '../context/BookingContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare
} from '../components/Icons.jsx';

const Contact = () => {
  const { showToast } = useBooking();

  // Controlled form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  // Validation error state
  const [errors, setErrors] = useState({});

  // Submission feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // FAQ accordion open item index
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear individual error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Full name check
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long';
    }

    // Email check with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com)';
    }

    // Subject check
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select an inquiry subject';
    }

    // Message check
    if (!formData.message.trim()) {
      newErrors.message = 'Message body cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a more detailed message (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      showToast('Please fix the highlighted errors before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData, sentAt: new Date().toLocaleTimeString() });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      setErrors({});

      showToast('Thank you! Your message has been received by our concierge.', 'success');
    }, 1200);
  };

  return (
    <div className="page-contact">
      {/* BANNER */}
      <section className="contact-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="banner-eyebrow">Direct Concierge Assistance</span>
          <h1 className="banner-title">Contact & Reservations</h1>
          <p className="banner-desc">
            Our dedicated hospitality ambassadors are available 24 hours a day, 7 days a week to fulfill your requests.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT CONTENT */}
      <div className="container section-padding">
        <div className="contact-layout-grid">
          {/* LEFT: Contact Information Cards */}
          <div className="contact-info-col">
            <span className="section-eyebrow">Connect With Us</span>
            <h2 className="section-title">We Are Here For You</h2>
            <p className="contact-lead-p">
              Whether you wish to inquire about an upcoming stay, coordinate VIP airport transfers, or plan an exclusive event, our team is at your command.
            </p>

            <div className="contact-cards-list">
              <div className="contact-card">
                <div className="card-icon-circle">
                  <MapPin size={24} />
                </div>
                <div className="card-text">
                  <h4>Physical Sanctuary Address</h4>
                  <p>{hotelInfo.address}</p>
                  <span className="card-note">Valet parking & yacht berths available</span>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-icon-circle">
                  <Phone size={24} />
                </div>
                <div className="card-text">
                  <h4>Telephone & WhatsApp</h4>
                  <p><strong>Reservations:</strong> {hotelInfo.phone}</p>
                  <p><strong>VIP Concierge:</strong> {hotelInfo.phoneAlt}</p>
                  <span className="card-note">Available 24 hours daily</span>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-icon-circle">
                  <Mail size={24} />
                </div>
                <div className="card-text">
                  <h4>Electronic Mail</h4>
                  <p><strong>Bookings:</strong> {hotelInfo.email}</p>
                  <p><strong>General Inquiries:</strong> {hotelInfo.inquiryEmail}</p>
                  <span className="card-note">Average response time: within 30 minutes</span>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-icon-circle">
                  <Clock size={24} />
                </div>
                <div className="card-text">
                  <h4>Timings & Check-in</h4>
                  <p><strong>Check-in:</strong> From {hotelInfo.checkInTime}</p>
                  <p><strong>Check-out:</strong> Until {hotelInfo.checkOutTime}</p>
                  <span className="card-note">Complimentary luggage storage available</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Functional Contact Form */}
          <div className="contact-form-col">
            <div className="form-wrapper-box">
              <div className="form-header">
                <div className="form-header-badge">
                  <MessageSquare size={16} />
                  <span>Send An Inquiry</span>
                </div>
                <h3 className="form-title">Concierge Inquiry Form</h3>
                <p className="form-subtitle">
                  Please fill out the form below. All fields marked with * are required.
                </p>
              </div>

              {/* Success Notification Alert */}
              {submittedData && (
                <div className="form-success-banner">
                  <CheckCircle2 size={24} className="success-icon" />
                  <div className="success-text">
                    <h4>Message Successfully Sent!</h4>
                    <p>
                      Thank you, <strong>{submittedData.fullName}</strong>. A confirmation has been sent to{' '}
                      <strong>{submittedData.email}</strong>. Our senior concierge will follow up promptly.
                    </p>
                  </div>
                </div>
              )}

              {/* The Form */}
              <form onSubmit={handleSubmit} noValidate className="interactive-contact-form">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="fullName" className="field-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Senator Marcus Williams"
                    className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  />
                  {errors.fullName && (
                    <span className="field-error-msg">
                      <AlertCircle size={14} /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label htmlFor="email" className="field-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && (
                    <span className="field-error-msg">
                      <AlertCircle size={14} /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Subject Selector */}
                <div className="form-group">
                  <label htmlFor="subject" className="field-label">
                    Subject of Inquiry <span className="req">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-control select-control ${errors.subject ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- Please select an option --</option>
                    <option value="Suite Reservation & Rates">Suite Reservation & Rates Inquiry</option>
                    <option value="Corporate Events & Banquets">Corporate Events & Banquet Hall Booking</option>
                    <option value="Wedding & Honeymoon Celebration">Fairy-tale Wedding & Honeymoon Packages</option>
                    <option value="Airport Limousine Transfer">VIP Airport Limousine Transfer</option>
                    <option value="Spa & Dining Reservation">The Horizon Spa or L'Horizon Table Booking</option>
                    <option value="Other Inquiries">Other / General Feedback</option>
                  </select>
                  {errors.subject && (
                    <span className="field-error-msg">
                      <AlertCircle size={14} /> {errors.subject}
                    </span>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="form-group">
                  <label htmlFor="message" className="field-label">
                    Message Body <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your requirements, dates of interest, and any tailored preferences..."
                    className={`form-control textarea-control ${errors.message ? 'is-invalid' : ''}`}
                  ></textarea>
                  {errors.message && (
                    <span className="field-error-msg">
                      <AlertCircle size={14} /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-submit-contact"
                >
                  {isSubmitting ? (
                    <span>Transmitting to Concierge...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Inquiry Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS (Interactive Accordion) */}
        <section className="faq-section section-padding">
          <div className="section-header-centered">
            <span className="section-eyebrow">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Find answers to the most common inquiries regarding bookings, payments, and amenities.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <span className="faq-icon-arrow">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
