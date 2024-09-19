import Navbar from "../components/Navbar";
import ProductDetails from "../components/ProductDetails";
import Footer from "../components/Footer";
import Categories from "../components/categories";
import { useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams();
    return (
        <>
            <Navbar />
            <Categories />
            <ProductDetails id={id} />
            
            <Footer />
        </>
    );
}

export default Details; 