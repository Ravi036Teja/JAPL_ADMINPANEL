// src/components/Notification.jsx
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa'; // Icons for different statuses

const Notification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Call the parent's close function after fading out
    }, 3000); // Notification disappears after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  let bgColorClass = '';
  let textColorClass = 'text-white';
  let IconComponent = FaInfoCircle; // Default icon

  switch (type) {
    case 'success':
      bgColorClass = 'bg-green-500';
      IconComponent = FaCheckCircle;
      break;
    case 'error':
      bgColorClass = 'bg-red-500';
      IconComponent = FaTimesCircle;
      break;
    case 'info':
      bgColorClass = 'bg-blue-500';
      IconComponent = FaInfoCircle;
      break;
    default:
      bgColorClass = 'bg-gray-700';
  }

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center space-x-3 transition-opacity duration-300 ${bgColorClass} ${textColorClass}`}
      role="alert"
    >
      <IconComponent className="text-xl" />
      <span className="font-semibold">{message}</span>
      <button onClick={() => { setIsVisible(false); onClose(); }} className="ml-auto text-white hover:text-gray-200">
        <FaTimesCircle />
      </button>
    </div>
  );
};

export default Notification;