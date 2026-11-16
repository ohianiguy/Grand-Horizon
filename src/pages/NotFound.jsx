import React from 'react';
import { Link } from '../router.jsx';
import { Compass, Home, ArrowLeft } from '../components/Icons.jsx';

const NotFound = () => {
  return (
    <div className="page-not-found container section-padding">
      <div className="not-found-card">
        <Compass size={64} className="not-found-icon" />
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Located</h2>
        <p className="not-found-text">
          The sanctuary or suite page you are seeking seems to have moved or does not exist.
        </p>
        <Link to="/" className="btn-primary-luxury">
          <ArrowLeft size={18} />
          <span>Return to Grand Horizon Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
