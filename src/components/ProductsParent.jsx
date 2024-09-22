import { useState } from "react"; // Import useState hook for state management
import SortBy from "./SortBy"; // Import SortBy component for sorting options
import Products from "./Products"; // Import Products component to display products

// Define the ProductsPage component
function ProductsPage() {
  // Initialize state for sortOption with default value "Low to High"
  const [sortOption, setSortOption] = useState("Low to High");
  // Initialize state for sortRate with default value ""
  const [sortRate, setSortRate] = useState("");

  // Function to handle changes in sortOption state
  const handleSortChange = (option) => {
    setSortOption(option); // Update sortOption state with the selected option
  };

  // Function to handle changes in sortRate state
  const handleSortRate = (rate) => {
    setSortRate(rate); // Update sortRate state with the selected rate
  };

  // JSX to render the ProductsPage component
  return (
    <div className="flex flex-col items-center"> // Container for the SortBy and Products components
      <SortBy onSortChange={handleSortChange} onSortRate={handleSortRate} /> // SortBy component with event handlers
      <Products 
        link="/api/products" // API link for fetching products
        sortOption={sortOption} // Pass the current sortOption to Products component
        sortRate={sortRate} // Pass the current sortRate to Products component
      />
    </div>
  );
}

export default ProductsPage;
