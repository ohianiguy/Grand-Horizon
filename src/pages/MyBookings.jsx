import React, { useState } from 'react';
import { Link } from '../router.jsx';
import { useBooking } from '../context/BookingContext';
import {
  CalendarCheck,
  Calendar,
  User,
  Phone,
  Mail,
  Trash2,
  Printer,
  BedDouble,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from '../components/Icons.jsx';

const MyBookings = () => {
  const { bookings, cancelBooking } = useBooking();
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleCancel = (booking) => {
    if (window.confirm(`Are you sure you want to cancel reservation #${booking.id} for "${booking.room.name}"?`)) {
      cancelBooking(booking.id);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-my-bookings">
      {/* BANNER */}
      <section className="bookings-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="banner-eyebrow">Reservation Management</span>
          <h1 className="banner-title">My Room Reservations</h1>
          <p className="banner-desc">
            View, manage, or print your confirmed room reservations with Grand Horizon Hotel & Suites.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container section-padding">
        {bookings.length === 0 ? (
          <div className="no-bookings-card">
            <CalendarCheck size={56} className="no-bookings-icon" />
            <h2>No Active Reservations Found</h2>
            <p>
              You do not have any room reservations right now. 
              Browse our rooms and reserve your stay anytime!
            </p>
            <Link to="/rooms" className="btn-primary-luxury">
              <span>Browse Available Rooms</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="bookings-list-wrapper">
            <div className="bookings-header-row">
              <h2>You have {bookings.length} confirmed {bookings.length === 1 ? 'reservation' : 'reservations'}</h2>
              <span className="secure-badge">
                <ShieldCheck size={16} /> Confirmed Room Reservations
              </span>
            </div>

            <div className="bookings-cards-grid">
              {bookings.map((b) => (
                <div key={b.id} className="booking-ticket-card">
                  <div className="ticket-top">
                    <div className="ticket-room-media">
                      <img src={b.room.image} alt={b.room.name} />
                      <span className="ticket-category">{b.room.category}</span>
                    </div>

                    <div className="ticket-room-details">
                      <div className="ticket-ref-row">
                        <span className="ref-label">Booking Reference:</span>
                        <span className="ref-code">#{b.id}</span>
                        <span className="status-pill confirmed">
                          <CheckCircle2 size={12} /> {b.status}
                        </span>
                      </div>

                      <h3 className="ticket-room-name">{b.room.name}</h3>
                      <p className="ticket-tagline">{b.room.tagline}</p>

                      <div className="ticket-specs-row">
                        <div className="ticket-spec">
                          <Calendar size={14} />
                          <span>
                            <strong>Check-in:</strong> {b.checkIn}
                          </span>
                        </div>
                        <div className="ticket-spec">
                          <Calendar size={14} />
                          <span>
                            <strong>Check-out:</strong> {b.checkOut}
                          </span>
                        </div>
                        <div className="ticket-spec">
                          <Clock size={14} />
                          <span>
                            <strong>Duration:</strong> {b.nights} {b.nights === 1 ? 'Night' : 'Nights'}
                          </span>
                        </div>
                        <div className="ticket-spec">
                          <User size={14} />
                          <span>
                            <strong>Guests:</strong> {b.guests}
                          </span>
                        </div>
                      </div>

                      <div className="ticket-guest-info">
                        <span><strong>Guest Name:</strong> {b.fullName}</span>
                        <span>•</span>
                        <span><strong>Email:</strong> {b.email}</span>
                        <span>•</span>
                        <span><strong>Phone:</strong> {b.phone}</span>
                      </div>

                      {b.specialRequests && (
                        <div className="ticket-requests">
                          <strong>Special Requests:</strong> {b.specialRequests}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ticket-bottom">
                    <div className="ticket-status-info">
                      <span className="status-note">
                        <CheckCircle2 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                        Room is reserved under your name. No payment needed online.
                      </span>
                    </div>

                    <div className="ticket-actions">
                      <button
                        className="btn-print-voucher"
                        onClick={() => setSelectedVoucher(b)}
                        title="View printable voucher"
                      >
                        <Printer size={16} />
                        <span>View Voucher</span>
                      </button>

                      <button
                        className="btn-cancel-reservation"
                        onClick={() => handleCancel(b)}
                        title="Cancel this reservation"
                      >
                        <Trash2 size={16} />
                        <span>Cancel Booking</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PRINTABLE VOUCHER MODAL */}
      {selectedVoucher && (
        <div className="modal-backdrop voucher-backdrop" onClick={() => setSelectedVoucher(null)}>
          <div className="voucher-modal" onClick={(e) => e.stopPropagation()}>
            <div className="voucher-printable-area">
              <div className="voucher-header">
                <div className="voucher-brand">
                  <h2>GRAND HORIZON</h2>
                  <p>HOTEL & SUITES • RESERVATION CONFIRMATION VOUCHER</p>
                </div>
                <div className="voucher-ref">
                  <span>BOOKING CODE</span>
                  <h3>#{selectedVoucher.id}</h3>
                </div>
              </div>

              <div className="voucher-divider"></div>

              <div className="voucher-grid">
                <div>
                  <h4>GUEST DETAILS</h4>
                  <p><strong>Primary Guest:</strong> {selectedVoucher.fullName}</p>
                  <p><strong>Email Address:</strong> {selectedVoucher.email}</p>
                  <p><strong>Contact Phone:</strong> {selectedVoucher.phone}</p>
                  <p><strong>Total Guests:</strong> {selectedVoucher.guests}</p>
                </div>

                <div>
                  <h4>RESERVATION DATES</h4>
                  <p><strong>Check-in:</strong> {selectedVoucher.checkIn} (From 3:00 PM)</p>
                  <p><strong>Check-out:</strong> {selectedVoucher.checkOut} (Until 12:00 PM)</p>
                  <p><strong>Duration:</strong> {selectedVoucher.nights} Nights</p>
                  <p><strong>Reservation Status:</strong> Confirmed</p>
                </div>
              </div>

              <div className="voucher-room-block">
                <h4>ROOM ALLOCATION</h4>
                <p><strong>{selectedVoucher.room.name}</strong> ({selectedVoucher.room.category})</p>
                <p>{selectedVoucher.room.view} • {selectedVoucher.room.bedType} • {selectedVoucher.room.size}</p>
                {selectedVoucher.specialRequests && (
                  <p className="voucher-special"><strong>Special Requests:</strong> {selectedVoucher.specialRequests}</p>
                )}
              </div>

              <div className="voucher-footer-notes">
                <p>
                  * Please present this confirmation voucher or reference code upon arrival at the Grand Horizon front desk.
                  Complimentary Wi-Fi and breakfast are included with this room reservation.
                </p>
              </div>
            </div>

            <div className="voucher-modal-actions no-print">
              <button className="btn-secondary" onClick={() => setSelectedVoucher(null)}>
                Close
              </button>
              <button className="btn-primary-luxury" onClick={handlePrint}>
                <Printer size={16} />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
