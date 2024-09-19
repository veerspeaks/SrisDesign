import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/reducers/WishSlice";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons

function AddtoWishlistButton({ id, image, title, price, useIcon = false }) { 
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        setIsInWishlist(wishlistItems.some(item => item.id === id));
    }, [wishlistItems, id]);

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(id));  // Remove from wishlist
        } else {
            dispatch(addToWishlist({ id, image, title, price }));  // Add to wishlist
        }
    };

    return (
        <>
            {useIcon ? (
                <button onClick={handleWishlistToggle} className="focus:outline-none">
                    {isInWishlist ? (
                        <AiFillHeart className="text-purple-500 text-2xl" />  // Filled heart
                    ) : (
                        <AiOutlineHeart className="text-gray-400 text-2xl hover:text-purple-500" />  // Empty heart
                    )}
                </button>
            ) : (
                <button className="bg-[#6C48C5] text-white px-4 py-2 rounded-full" onClick={handleWishlistToggle}>
                    {isInWishlist ? "Added to wishlist" : "Add to wishlist"}
                </button>
            )}
        </>
    );
}

export default AddtoWishlistButton;
