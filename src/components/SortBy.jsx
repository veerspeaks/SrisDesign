import { useState } from "react";
import ShowCart from "./ShowCart";

function SortBy({ onSortChange, onSortRate, isMobile }) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleSortChange = (option) => {
    onSortChange(option); // Pass the correct option to the parent
  };

  const handleSortRate = (rate) => {
    onSortRate(rate); // Pass the correct option to the parent
  };

  
  return (
    <div className="flex flex-col justify-end w-1/3 gap-10 mt-6 ml-4">
      <span className="text-white text-6xl font-bold">Sort By</span>
      <div className="flex gap-10">
        <span className="text-white text-4xl font-bold">Price</span>
        {/* Update option values here */}
        <select className="flex gap-4 rounded-full px-4" onChange={(e) => handleSortChange(e.target.value)}>
          <option value="Low to High">Low to High</option> {/* distinct value */}
          <option value="High to Low">High to Low</option> {/* distinct value */}
        </select>
      </div>
      {/* Other options remain the same */}
      <div className="flex gap-10">
        <span className="text-white text-4xl font-bold">Reviews</span>
        <select
          className="flex gap-4 rounded-full px-4"
          onChange={(e) => handleSortRate(e.target.value)}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
      </div>
      <div className="flex gap-10 items-center">
        <span className="text-white text-2xl font-bold">
          Include Out of Stock
        </span>
        <div className="flex flex-col gap-4 ml-6">
          <div
            className={`relative w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
              isOn ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={toggleSwitch}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-300 ${
                isOn ? "transform translate-x-8" : "transform translate-x-1"
              }`}
            ></div>
          </div>
        </div>
      </div>
      <div>
        {!isMobile && (
          <>
            <span className="text-white text-4xl font-bold">Cart</span>
            <div className="flex items-center pl-10">
          <ShowCart />
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SortBy;
