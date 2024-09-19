import Products from "../components/Products";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import Categories from "../components/categories";
import Footer from "../components/Footer";
import SortBy from "../components/SortBy";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import CatDisplay from "../components/CatDisplay";

function ShowProducts() {
  const [backgroundGradient, setBackgroundGradient] = useState("");
  const [sortOption, setSortOption] = useState("Low to High");

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
      <div className="flex w-full">
        <div className="w-1/3" style={{ background: backgroundGradient }}>
          <SortBy onSortChange={setSortOption} />
        </div>
        <div className="w-2/3">
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
