import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2, AlertCircle, Info, X } from './Icons.jsx';

const Toast = () => {
  const { toast, hideToast } = useBooking();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="toast-icon success" size={20} />,
    error: <AlertCircle className="toast-icon error" size={20} />,
    info: <Info className="toast-icon info" size={20} />
  };

  return (
    <div className={`toast-container ${toast.type}`}>
      <div className="toast-content">
        {icons[toast.type] || icons.info}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button className="toast-close" onClick={hideToast} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
