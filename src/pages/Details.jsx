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
            {/* Add sufficient margin-top to prevent overlap on mobile */}
            <div className="flex flex-col md:w-full md:flex-row md:mt-0">
                <div className="w-full md:pt-0 ">
                    <ProductDetails id={id} />
                </div>
            </div>
            <Footer className="mt-auto" />
        </>
    );
}

export default Details;
