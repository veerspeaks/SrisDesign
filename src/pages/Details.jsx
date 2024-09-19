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
            <div className="flex flex-col sm:w-full sm:flex-row sm:mt-0">
                <div className="w-full sm:pt-0 ">
                    <ProductDetails id={id} />
                </div>
            </div>
            <Footer className="mt-auto" />
        </>
    );
}

export default Details;
