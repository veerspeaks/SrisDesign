import { useState } from "react";
import SortBy from "./SortBy";
import Products from "./Products";

function ProductsPage() {
  const [sortOption, setSortOption] = useState("Low to High");
  const [sortRate, setSortRate] = useState("");

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSortRate = (rate) => {
    setSortRate(rate);
  };

  return (
    <div className="flex flex-col items-center">
      <SortBy onSortChange={handleSortChange} onSortRate={handleSortRate} />
      <Products 
        link="/api/products" 
        sortOption={sortOption} 
        sortRate={sortRate} 
      />
    </div>
  );
}

export default ProductsPage;
