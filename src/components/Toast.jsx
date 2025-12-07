import React from 'react';
import './Toast.css';

const Toast = ({ message, isVisible }) => {
  return (
    <div className={`toast ${isVisible ? 'toast--visible' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;