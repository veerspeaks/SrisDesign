import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Categories from "../components/categories";
import Slidebar from "../components/slidebar";
import CatDisplay from "../components/CatDisplay";
import Products from "../components/Products";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Categories />
      <Slidebar />
      <CatDisplay
        link="https://fakestoreapi.com/products/category/jewelery"
        categoryTitle="Jewelery"
        categoryDescription="Explore a wide range of jewelery, from necklaces to earrings, and find the perfect jewelery for your needs."
        gradColor1="#6C48C5"
        gradColor2="#F2C464"
      />
      <CatDisplay
        link="https://fakestoreapi.com/products/category/electronics"
        categoryTitle="Electronics"
        categoryDescription="Explore a wide range of electronics, from laptops to smartphones, and find the perfect electronics for your needs."
        gradColor1="#8B0000"
        gradColor2="#FFFF00"
      />
      <CatDisplay
        link="https://fakestoreapi.com/products/category/men&apos;s%20clothing"
        categoryTitle="Men&apos;s Clothing"
        categoryDescription="Explore a wide range of men&apos;s clothing, from casual wear to formal attire, and find the perfect outfit for your style."
        gradColor1="#007BFF"
        gradColor2="#00BFFF"
      />
      <Footer />
    </>
  );
};

export default Home;
