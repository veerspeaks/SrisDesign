import React, { useState } from 'react'; // Import React and useState hook
import { useSelector } from "react-redux"; // Import useSelector hook from react-redux
import Search from "./Search"; // Import Search component
import SignInModal from "./SignInModal"; // Import SignInModal component

// Navbar component definition
const Navbar = () => {
  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to manage the visibility of the sign in modal
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  // State to hold the user data
  const [user, setUser] = useState(null);

  // Function to handle sign in
  const handleSignIn = (userData) => {
    setUser(userData);
  };

  // Select cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // Select wishlist items from the Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Render the Navbar component
  return (
    <div className="flex flex-col w-full h-auto items-center bg-[#FFF7F7] md:flex-row md:h-24 md:justify-between">
      {/* Mobile header */}
      <div className="flex justify-between items-center w-full px-4 h-16 md:hidden">
        <a href="/" className="flex justify-center">
          <img src="/assets/image_21.png" alt="logo" className="h-15" />
        </a>
        <button
          onClick={toggleMenu}
          className="bg-[#6439FF] hover:bg-[#4F75FF] text-white font-bold py-2 px-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop logo - unchanged */}
      <div className="hidden md:block md:w-64 md:h-48 md:pt-16">
        <a href="/">
          <img src="/assets/image_21.png" alt="logo" />
        </a>
      </div>

      {/* Search bar for desktop */}
      <div className="hidden md:flex searchbar flex pt-4 items-center pr-4 md:pr-0">
        <Search />
      </div>

      {/* Desktop menu - unchanged */}
      <div className="hidden md:flex flex-row gap-4 pr-10 items-center">
        <ul className="flex flex-row gap-4 pt-4">
          <li className="pt-1.5">
            {user ? (
              <span className="font-bold">{user.name}</span>
            ) : (
              <>
                <a href="#" className="font-bold" onClick={() => setIsSignInModalOpen(true)}>
                  Sign In
                </a>
                <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} onSignIn={handleSignIn} />
              </>
            )}
          </li>
          <li className="pt-1.5">
            <a href="/order" className="font-bold">
              Order
            </a>
          </li>
          <li className="relative">
            <a href="/wishlist" className="font-bold flex items-center gap-2 relative">
              <img
                className="w-10 h-10"
                src="/assets/1294473-673ab7.svg"
                alt="react"
              />
              Wishlist
              {/* Wishlist Notification Badge */}
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6439FF] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </a>
          </li>
          <li className="relative">
            <a href="/cart" className="font-bold flex items-center gap-2 relative">
              <img
                className="w-10 h-10"
                src="/assets/294547-673ab7.svg"
                alt="react"
              />
              Cart
              {/* Cart Notification Badge */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6439FF] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden flex flex-col gap-4 pt-4 pb-6 items-center bg-[#FFF7F7] w-full transition-all duration-300 ease-in-out ${
          isModalOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="searchbar flex pt-4 items-center px-4">
          <Search className="w-full" />
        </div>
        <ul className="flex flex-col gap-4 pt-4 items-center">
          <li className="pt-1.5">
            {user ? (
              <span className="font-bold">{user.name}</span>
            ) : (
              <>
                <a href="#" className="font-bold" onClick={() => setIsSignInModalOpen(true)}>
                  Sign In
                </a>
                <SignInModal 
                  isOpen={isSignInModalOpen} 
                  onClose={() => setIsSignInModalOpen(false)} 
                  onSignIn={handleSignIn} 
                />
              </>
            )}
          </li>
          <li className="pt-1.5">
            <a href="/order" className="font-bold">
              Order
            </a>
          </li>
          <li className="relative">
            <a href="/wishlist" className="font-bold flex items-center gap-2 relative">
              <img
                className="w-10 h-10"
                src="/assets/1294473-673ab7.svg"
                alt="react"
              />
              Wishlist
              {/* Wishlist Notification Badge for small screen */}
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6439FF] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlistItems.length}
                </span>
              )}
            </a>
          </li>
          <li className="relative">
            <a href="/cart" className="font-bold flex items-center gap-2 relative">
              <img
                className="w-10 h-10"
                src="/assets/294547-673ab7.svg"
                alt="react"
              />
              Cart
              {/* Cart Notification Badge for small screen */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#6439FF] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Export the Navbar component
export default Navbar;