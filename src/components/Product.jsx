import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/CartSlice";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import Reviews from "./Reviews";
import AddtoWishlistButton from "./AddtoWishlistButton";

function Product({ id, image, title, price, rate, count }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, image, title, price }));
  };

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
