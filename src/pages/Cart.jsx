import ShowCart from "../components/ShowCart";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import TotalCart from "../components/TotalCart";
import { useSelector } from "react-redux";

function Cart() {
  // Set an initial background gradient so it's there on first render
  const generateGradient = () => {
    return `linear-gradient(135deg, #${Math.floor(Math.random() * 16777215).toString(16)} 0%, #${Math.floor(Math.random() * 16777215).toString(16)} 100%)`;
  };
  
  const [backgroundGradient, setBackgroundGradient] = useState(generateGradient());
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    // Ensure gradient is set again after the component mounts
    const newGradient = generateGradient();
    setBackgroundGradient(newGradient);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full flex-grow" style={{ background: backgroundGradient }}>
        <div className="flex flex-col w-full md:w-2/3 md:pt-6 md:pl-6 pb-6 md:pb-0">
          <span className="text-8xl font-bold text-white">Cart</span>
          {cartItems.length === 0 ? (
            <div className="text-white text-center text-4xl italic">No items in cart</div>
          ) : (
            <div className="w-full pt-14">
              <ShowCart />
            </div>
          )}
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:pt-16 md:gap-36">
            <span className="text-sm md:text-2xl font-bold text-white">Have a Coupon?</span>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Enter your coupon"
                className="w-80 p-2 border border-gray-300 rounded-full"
              />
              <button className="w-1/2 p-2 bg-[#6C48C5] text-white rounded-full">Apply</button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:pt-6 md:pr-6" style={{ background: backgroundGradient }}>
          <div className="flex flex-col pb-4"><TotalCart total={3435} /></div> 
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default Cart;
