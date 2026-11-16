import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from './router.jsx';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import BookingModal from './components/BookingModal';
import Home from './pages/Home';
import About from './pages/About';
import ServicesRooms from './pages/ServicesRooms';
import Contact from './pages/Contact';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';
import './styles/App.css';

// Scroll to top helper on every page route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />
      <Toast />
      <BookingModal />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<ServicesRooms />} />
          <Route path="/services" element={<ServicesRooms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
