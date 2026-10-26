import React from 'react';
import { Snowflake, X } from 'lucide-react';

export default function ToastNotification({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-notification-wrapper">
      <div className="toast-card">
        <div className="toast-icon">
          <Snowflake size={18} className="text-cyan animate-spin-slow" />
        </div>
        <span className="toast-text">{message}</span>
        <button onClick={onClose} className="toast-close-btn" aria-label="Fermer la notification">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
