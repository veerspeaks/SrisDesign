import { Link } from "react-router-dom"; // Import Link from react-router-dom for routing
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux for dispatching actions
import { addToCart } from "../redux/reducers/CartSlice"; // Import addToCart action from CartSlice
import AddToCartButton from "./AddToCartButton"; // Import AddToCartButton component
import BuyNowButton from "./BuyNowButton"; // Import BuyNowButton component
import Reviews from "./Reviews"; // Import Reviews component
import AddtoWishlistButton from "./AddtoWishlistButton"; // Import AddtoWishlistButton component

// Define the Product component
function Product({ id, image, title, price, rate, count }) {
  // Initialize dispatch function from react-redux
  const dispatch = useDispatch();

  // Function to handle adding a product to the cart
  const handleAddToCart = () => {
    // Dispatch the addToCart action with product details
    dispatch(addToCart({ id, image, title, price }));
  };

  // JSX for the Product component
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div
        key={id}
        className="flex flex-col justify-between max-w-xs w-64 rounded-lg overflow-hidden shadow-lg bg-white m-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
      >
        {/* Wrap only the non-button elements inside the Link */}
        <Link to={`/product/${id}`}>
          <div className="h-32 w-full overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              src={image}
              alt={title}
            />
          </div>
          <div className="flex flex-col px-2 py-2 flex-grow items-center justify-between">
            <div className="font-bold text-md mb-2 text-gray-800">{title}</div>
          </div>
        </Link>

        {/* Buttons are outside the Link, so they are not part of the clickable Link */}
        <div className="px-2 py-2 flex flex-col justify-center gap-2 bg-gray-600 items-center">
          <div className="flex justify-between items-center px-2 py-2">
            <Reviews rate={rate} count={count} />
          </div>
          <div className="flex mb-2 gap-4">
            <div className="text-md font-semibold text-white">₹{80 * price}</div>
          </div>
          <div className="flex gap-2">
            <BuyNowButton
              id={id}
              image={image}
              title={title}
              price={price}
            />
            <AddToCartButton
              id={id}
              image={image}
              title={title}
              price={price}
            />
            <AddtoWishlistButton
              id={id}
              image={image}
              title={title}
              price={price}
              useIcon={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
