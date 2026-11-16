import React, { useState, useMemo } from 'react';
import RoomCard from '../components/RoomCard';
import ServiceCard from '../components/ServiceCard';
import { roomsData } from '../data/roomsData';
import { servicesData } from '../data/servicesData';
import { useBooking } from '../context/BookingContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  BedDouble,
  ConciergeBell
} from '../components/Icons.jsx';

const ServicesRooms = () => {
  const { searchCriteria } = useBooking();

  // Active view tab: 'rooms' | 'services'
  const [activeTab, setActiveTab] = useState('rooms');

  // Interactive filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchCriteria.roomType || 'All');
  const [guestFilter, setGuestFilter] = useState('All');

  const categories = ['All', 'Deluxe', 'Executive', 'Penthouse', 'Villa', 'Suites'];

  // Filter Logic using JavaScript Array Methods (.filter)
  const filteredRooms = useMemo(() => {
    return roomsData.filter((room) => {
      // Search term matches room name, description, or amenities
      const matchesSearch =
        searchTerm === '' ||
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.amenities.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || room.category.toLowerCase() === selectedCategory.toLowerCase();

      // Guest filter
      const matchesGuests =
        guestFilter === 'All' ||
        (guestFilter === '2' && room.capacity >= 2) ||
        (guestFilter === '4' && room.capacity >= 4);

      return matchesSearch && matchesCategory && matchesGuests;
    });
  }, [searchTerm, selectedCategory, guestFilter]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setGuestFilter('All');
  };

  return (
    <div className="page-services-rooms">
      {/* HEADER BANNER */}
      <section className="rooms-banner">
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <span className="banner-eyebrow">Accommodations & Curated Amenities</span>
          <h1 className="banner-title">Rooms, Suites & Hotel Services</h1>
          <p className="banner-desc">
            Explore our collection of comfortable rooms, oceanfront suites, and signature hotel services.
          </p>

          {/* VIEW TAB SWITCHER */}
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
              onClick={() => setActiveTab('rooms')}
            >
              <BedDouble size={18} />
              <span>Rooms & Suites ({roomsData.length})</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <ConciergeBell size={18} />
              <span>Hotel Services ({servicesData.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="container section-padding">
        {activeTab === 'rooms' ? (
          <div className="rooms-catalog-section">
            {/* FILTER & CONTROLS TOOLBAR */}
            <div className="filter-toolbar">
              {/* Search input */}
              <div className="search-box">
                <Search size={18} className="search-box-icon" />
                <input
                  type="text"
                  placeholder="Search rooms by name or amenity (e.g. Wi-Fi, Balcony, Jacuzzi)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-box-input"
                />
                {searchTerm && (
                  <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                    ×
                  </button>
                )}
              </div>

              {/* Controls Row */}
              <div className="controls-row">
                {/* Guest Capacity */}
                <div className="control-item">
                  <label htmlFor="guestFilter">Occupancy:</label>
                  <select
                    id="guestFilter"
                    value={guestFilter}
                    onChange={(e) => setGuestFilter(e.target.value)}
                    className="control-select"
                  >
                    <option value="All">All Capacities</option>
                    <option value="2">2+ Guests</option>
                    <option value="4">4+ Guests (Families)</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <button className="btn-reset-filters" onClick={handleResetFilters} title="Reset all filters">
                  <RotateCcw size={15} />
                  <span>Reset Filters</span>
                </button>
              </div>

              {/* Category Pills */}
              <div className="category-pills-row">
                <span className="pills-label">Category:</span>
                <div className="pills-list">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RESULTS COUNT & ACTIVE FILTERS */}
            <div className="results-status-row">
              <p className="results-count">
                Showing <strong>{filteredRooms.length}</strong> of {roomsData.length} available rooms
              </p>
              {filteredRooms.length === 0 && (
                <div className="no-results-box">
                  <SlidersHorizontal size={40} className="no-results-icon" />
                  <h3>No Rooms Match Your Search</h3>
                  <p>Try searching with another keyword or resetting the category filter.</p>
                  <button className="btn-primary-luxury" onClick={handleResetFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* ROOMS GRID USING .map() */}
            {filteredRooms.length > 0 && (
              <div className="rooms-grid">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* SIGNATURE SERVICES SECTION */
          <div className="services-catalog-section">
            <div className="section-header-centered">
              <span className="section-eyebrow">Hotel Facilities</span>
              <h2 className="section-title">Our Signature Services</h2>
              <p className="section-subtitle">
                Enhance your stay with our relaxing spa treatments, gourmet dining, shuttle service, and event hosting facilities.
              </p>
            </div>

            <div className="services-grid">
              {servicesData.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesRooms;
