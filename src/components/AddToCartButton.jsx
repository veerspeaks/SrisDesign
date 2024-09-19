import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/CartSlice";
import {useState} from "react";
import Counter from "./Counter";
import { useSelector } from "react-redux";



function AddToCartButton({id, image, title, price}) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const itemInCart = cartItems.find(item => item.id === id);
    const quantity = itemInCart ? itemInCart.quantity : 1;

    
    const isInCart = cartItems.some(item => item.id === id);

    const handleAddToCart = () => {
        dispatch(addToCart({id, image, title, price, quantity}));
    };

    return (
        <div>
            {!isInCart ? (
                <button className="bg-[#FFFFFF] text-black px-4 py-2 rounded-full" onClick={handleAddToCart}>
                    Add to cart
                </button>
            ) : <Counter initialQuantity={quantity} productId={id} />}
        </div>
    );
}

export default AddToCartButton;