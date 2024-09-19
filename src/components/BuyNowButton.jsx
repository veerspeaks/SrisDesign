import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/CartSlice";

function BuyNowButton({id, image, title, price}) {

    const dispatch = useDispatch();

    const handleBuyNow = () => {
        dispatch(addToCart({id, image, title, price}));
        window.location.href = "/cart";
    };

    return (
        <div>
            <button className="bg-[#1230AE] text-white  px-4 py-2 rounded-full" onClick={handleBuyNow}>
                Buy Now
            </button>
        </div>
    );
}

export default BuyNowButton;