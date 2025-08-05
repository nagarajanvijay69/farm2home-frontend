import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Success() {
  const location = useLocation();
  const { payment_id, order_id } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Payment Successful</h2>
        <p className="text-gray-700">Thank you for your payment!</p>
        <p className="mt-2 text-sm text-gray-600">Payment ID: {payment_id}</p>
        <p className="text-sm text-gray-600">Order ID: {order_id}</p>
      </div>
      <button onClick={()=> navigate('/order')} className='bg-green-500 text-white px-2 py-2 rounded mt-3'>Go To Myorder</button>
    </div>
  );
}

export default Success;