import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignInModal = ({ isOpen, onClose, onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const users = await response.json();
      
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        onSignIn(user);
        onClose();
      } else {
        // Handle invalid credentials
        console.error('Invalid email or password');
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-gradient-to-br from-purple-600 to-indigo-700 p-1 rounded-xl shadow-lg max-w-md w-full"
          >
            <div className="bg-white p-8 rounded-lg">
                <img src="/assets/image_21.png" alt="logo" className="w-100 h-30 mx-auto" />   
              <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Sign In</h2>
              <form onSubmit={handleSubmit} className="space-y-6 w-full flex flex-col items-center">
                <div>
                  <label htmlFor="email" className="flex text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className=''>
                  <label htmlFor="password" className="flex text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </form>
              <button
                onClick={onClose}
                className="mt-4 w-full text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;