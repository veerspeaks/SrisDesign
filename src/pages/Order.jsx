import React from 'react';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-[#6C48C5] mb-4">Your Orders</h1>
        <div className="bg-gray-50 p-6 rounded-md">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-xl text-gray-600 mb-4">You have not placed an order yet</p>
          <button className="bg-[#6C48C5] text-white py-2 px-4 rounded-full hover:bg-[#A162E8] transition-colors duration-200 " onClick={() => navigate("/")}>
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
