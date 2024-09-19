import ShowWish from "../components/ShowWish";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import TotalCart from "../components/TotalCart";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/CartSlice";
import { removeFromWishlist } from "../redux/reducers/WishSlice";
import YouMayLike from "../components/YouMayLike";

function Wishlist() {
  // Generate a random background gradient function
  const generateGradient = () => {
    return `linear-gradient(135deg, #${Math.floor(Math.random() * 16777215).toString(16)} 0%, #${Math.floor(Math.random() * 16777215).toString(16)} 100%)`;
  };

  const [backgroundGradient, setBackgroundGradient] = useState(generateGradient());
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleBuyAll = () => {
    wishlistItems.forEach(item => {
      dispatch(addToCart({ id: item.id, image: item.image, title: item.title, price: item.price, quantity: 1 }));
      dispatch(removeFromWishlist(item.id));
      window.location.href = "/cart";
    });
  };

  useEffect(() => {
    // Set a new gradient when the component mounts
    const newGradient = generateGradient();
    setBackgroundGradient(newGradient);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col sm:flex-row w-full flex-grow" style={{ background: backgroundGradient }}>
        <div className="flex flex-col w-full sm:w-2/3 pt-6 pl-6 pb-6 sm:pb-0">
          <span className="text-8xl font-bold text-white">Wishlist</span>
          {wishlistItems.length === 0 ? (
            <div className="text-white text-center text-4xl italic">
              No items in wishlist
            </div>
          ) : (
            <div className="w-full pt-14">
              <ShowWish />
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-center pt-16 gap-4 sm:gap-36">
            <span className="text-2xl font-bold text-white items-center">Feeling Cute Today?</span>
            <div className="flex flex-col gap-2 ">
              <button
                className={`w-1/2 p-2 ${
                  wishlistItems.length === 0 ? "bg-gray-500" : "bg-[#6C48C5]"
                } text-white rounded-full ${
                  wishlistItems.length === 0
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-violet-500"
                }`}
                disabled={wishlistItems.length === 0}
                onClick={handleBuyAll}
              >
                Buy &apos;em All
              </button>
              <span className="text-white text-l italic">All items in wishlist will be added to cart</span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/3 pt-6 pr-6" style={{ background: backgroundGradient }}>
          <YouMayLike link="https://fakestoreapi.com/products?limit=9" />
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}

export default Wishlist;
