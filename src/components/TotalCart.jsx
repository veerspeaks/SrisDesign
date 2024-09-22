import { useState } from "react";
import { useSelector } from "react-redux";

function TotalCart() {
  const [shippingMethod, setShippingMethod] = useState("standard");
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalAmount = 80 * total + (shippingMethod === "standard" ? 50 : 100);

  return (
    <div className="flex flex-col">
      <span className="text-white text-4xl font-bold p-10">Total Cart</span>
      <span className="flex text-white text-8xl font-bold justify-center">₹{80 * total}</span>
      <span className="flex text-white text-2xl font-bold p-10">Choose a Shipping Method</span>
      <div className="flex flex-col items-center gap-4 justify-center items-center">
        <div className={`flex flex-row text-white text-xl gap-4 p-4 rounded-lg transition-all duration-300 ease-in-out ${shippingMethod === "standard" ? "bg-white/20 backdrop-blur-md border border-white/50" : ""}`}>
          <input 
            type="radio" 
            name="shipping" 
            id="standard" 
            checked={shippingMethod === "standard"} 
            onChange={() => setShippingMethod("standard")} 
            className="w-5 h-5"
          />
          <label htmlFor="standard">Standard Shipping+ ₹50</label>
        </div>
        <div className={`flex flex-row text-white text-xl gap-4 p-4 rounded-lg transition-all duration-300 ease-in-out ${shippingMethod === "express" ? "bg-white/20 backdrop-blur-md border border-white/50" : ""}`}>
          <input 
            type="radio" 
            name="shipping" 
            id="express" 
            checked={shippingMethod === "express"} 
            onChange={() => setShippingMethod("express")} 
            className="w-5 h-5"
          />
          <label htmlFor="express">Express Shipping +₹100</label>
        </div>
      </div>
      <span className="flex text-white text-2xl font-bold p-10">Confirm Address</span>
      <div className="flex justify-center">
        <button className="bg-[#6C48C5] text-white text-xl font-bold mt-36 p-4 rounded-full w-1/2 hover:bg-violet-500">Pay ₹{finalAmount} </button>
      </div>
    </div>
  );
}

export default TotalCart;
