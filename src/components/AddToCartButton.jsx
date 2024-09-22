import { useDispatch } from "react-redux"; // Import useDispatch hook from react-redux
import { addToCart } from "../redux/reducers/CartSlice"; // Import addToCart action from CartSlice
import { useState } from "react"; // Import useState hook from React
import Counter from "./Counter"; // Import Counter component
import { useSelector } from "react-redux"; // Import useSelector hook from react-redux

function AddToCartButton({ id, image, title, price }) {
    const dispatch = useDispatch(); // Initialize dispatch function
    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux store
    const itemInCart = cartItems.find(item => item.id === id); // Find if the item is already in the cart
    const quantity = itemInCart ? itemInCart.quantity : 1; // Set quantity to item's quantity in cart or 1 if not in cart

    const isInCart = cartItems.some(item => item.id === id); // Check if item is in the cart

    const handleAddToCart = () => {
        dispatch(addToCart({ id, image, title, price, quantity })); // Dispatch addToCart action with item details
    };

    return (
        <div>
            {!isInCart ? (
                <button className="bg-[#FFFFFF] text-black px-2 py-2 rounded-full" onClick={handleAddToCart}>
                    Add to cart
                </button>
            ) : (
                <Counter initialQuantity={quantity} productId={id} /> // Show Counter component if item is in cart
            )}
        </div>
    );
}

export default AddToCartButton; // Export AddToCartButton component