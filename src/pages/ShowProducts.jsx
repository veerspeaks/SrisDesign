import Products from "../components/Products";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Categories from "../components/categories";
import Footer from "../components/Footer";
import SortBy from "../components/SortBy";
import { useEffect, useState } from "react";
import CatDisplay from "../components/CatDisplay";

function ShowProducts() {
  const [backgroundGradient, setBackgroundGradient] = useState("");
  const [sortOption, setSortOption] = useState("Low to High");
  const [isSortByOpen, setIsSortByOpen] = useState(false); // New state for dropdown toggle

  useEffect(() => {
    try {
      const gradient = `linear-gradient(135deg, #${Math.floor(
        Math.random() * 16777215
      ).toString(16)} 0%, #${Math.floor(Math.random() * 16777215).toString(
        16
      )} 100%)`;
      setBackgroundGradient(gradient);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, []);

  const { categoryId } = useParams();
  console.log(categoryId);

  return (
    <div>
      <Navbar />
      <Categories />
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/3" style={{ background: backgroundGradient }}>
          {/* Mobile version toggle */}
          <div className="block md:hidden p-4">
            <button
              className="bg-gray-200 text-black px-4 py-2 rounded-md shadow-md flex items-center justify-between w-full"
              onClick={() => setIsSortByOpen(!isSortByOpen)}
            >
              Sort By
              <span className={`transform transition-transform ${isSortByOpen ? 'rotate-180' : 'rotate-0'}`}>
                ▼
              </span>
            </button>
            {isSortByOpen && (
              <div className="mt-2 p-4 rounded-md shadow-md" style={{ background: backgroundGradient }}>
                <SortBy onSortChange={setSortOption} isMobile={true} />
              </div>
            )}
          </div>
          {/* Desktop version */}
          <div className="hidden md:block p-4">
            <SortBy onSortChange={setSortOption} isMobile={false} />
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <Products
            link={`https://fakestoreapi.com/products/category/${categoryId}`}
            sortOption={sortOption}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ShowProducts;
