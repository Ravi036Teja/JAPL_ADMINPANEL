// src/components/Modal.jsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid'; // Example icon from @heroicons/react (install if not already)
// If you prefer react-icons: import { FaTimes } from 'react-icons/fa';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative p-6 bg-white w-full max-w-2xl mx-auto rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          >
            {/* Using @heroicons/react for example - you can use react-icons if preferred */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {/* If using react-icons: <FaTimes className="w-6 h-6" /> */}
          </button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;