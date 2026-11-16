import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  // Load saved bookings from localStorage
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_horizon_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse bookings from localStorage', e);
      return [];
    }
  });

  // Load saved favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('grand_horizon_favorites');
      return saved ? JSON.parse(saved) : [1, 2]; // Default 2 popular rooms favorited
    } catch (e) {
      console.error('Failed to parse favorites from localStorage', e);
      return [];
    }
  });

  // Active room for booking modal
  const [activeModalRoom, setActiveModalRoom] = useState(null);

  // Global search criteria initiated from Home or Nav
  const [searchCriteria, setSearchCriteria] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    roomType: 'All'
  });

  // Global toast notification state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' | 'info' | 'error'
  });

  // Persist bookings to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('grand_horizon_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  // Persist favorites to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('grand_horizon_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Show toast utility
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  // Add reservation
  const addBooking = (bookingData) => {
    const confirmationId = 'GH-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      ...bookingData,
      id: confirmationId,
      createdAt: new Date().toISOString()
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Reservation Confirmed! Reference: #${confirmationId}`, 'success');
    return newBooking;
  };

  // Cancel reservation
  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    showToast('Reservation successfully canceled.', 'info');
  };

  // Toggle favorite
  const toggleFavorite = (roomId) => {
    setFavorites((prev) => {
      if (prev.includes(roomId)) {
        showToast('Removed from your Saved Favorites.', 'info');
        return prev.filter((id) => id !== roomId);
      } else {
        showToast('Room added to your Saved Favorites!', 'success');
        return [...prev, roomId];
      }
    });
  };

  const isFavorite = (roomId) => favorites.includes(roomId);

  const openBookingModal = (room) => {
    setActiveModalRoom(room);
  };

  const closeBookingModal = () => {
    setActiveModalRoom(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        favorites,
        activeModalRoom,
        searchCriteria,
        toast,
        setSearchCriteria,
        addBooking,
        cancelBooking,
        toggleFavorite,
        isFavorite,
        openBookingModal,
        closeBookingModal,
        showToast,
        hideToast
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
