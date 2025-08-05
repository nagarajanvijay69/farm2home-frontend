import React from 'react';
import { useLocation } from 'react-router-dom';

function Failure() {
  const location = useLocation();
  const { reason } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Payment Failed</h2>
        <p className="text-gray-700">{reason || "Something went wrong during payment."}</p>
      </div>
    </div>
  );
}

export default Failure;