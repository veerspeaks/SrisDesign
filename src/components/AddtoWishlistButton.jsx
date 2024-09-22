import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/reducers/WishSlice";
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import heart icons

// AddtoWishlistButton component
function AddtoWishlistButton({ id, image, title, price, useIcon = false }) { 
    const wishlistItems = useSelector((state) => state.wishlist.items); // Get wishlist items from Redux store
    const dispatch = useDispatch(); // Initialize dispatch function
    const [isInWishlist, setIsInWishlist] = useState(false); // Initialize isInWishlist state

    // useEffect hook to update isInWishlist state
    useEffect(() => {
        setIsInWishlist(wishlistItems.some(item => item.id === id)); // Check if the item is in the wishlist
    }, [wishlistItems, id]);

    // Function to handle wishlist toggle
    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(id));  // Remove from wishlist
        } else {
            dispatch(addToWishlist({ id, image, title, price }));  // Add to wishlist
        }
    };

    // Render AddtoWishlistButton component
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
                <button className="bg-[#6C48C5] text-white px-2 py-2 rounded-full" onClick={handleWishlistToggle}>
                    {isInWishlist ? "Added to wishlist" : "Add to wishlist"}
                </button>
            )}
        </>
    );
}

export default AddtoWishlistButton; // Export AddtoWishlistButton component
