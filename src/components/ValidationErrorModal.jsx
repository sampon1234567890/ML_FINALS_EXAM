import React from 'react';

export default function ValidationErrorModal({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-overlay">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 modal-content">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl animate-bounce">⚠️</span>
          <h3 className="text-xl font-bold text-gray-900">Missing Required Fields</h3>
        </div>
        <p className="text-gray-700 mb-6">
          Please fill in all required fields before generating results. All input fields must be completed.
        </p>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
