import { useDispatch } from "react-redux"; // Import useDispatch hook from react-redux
import { addToCart } from "../redux/reducers/CartSlice"; // Import addToCart action from CartSlice

// BuyNowButton component definition
function BuyNowButton({id, image, title, price}) {
    // Initialize dispatch function from react-redux
    const dispatch = useDispatch();

    // Function to handle the Buy Now button click
    const handleBuyNow = () => {
        // Dispatch addToCart action with product details to add to cart
        dispatch(addToCart({id, image, title, price}));
        // Redirect to the cart page after adding to cart
        window.location.href = "/cart";
    };

    // Render the Buy Now button
    return (
        <div>
            <button 
                className="bg-[#1230AE] text-white px-4 py-2 rounded-full" 
                onClick={handleBuyNow}
            >
                Buy Now
            </button>
        </div>
    );
}

export default BuyNowButton;