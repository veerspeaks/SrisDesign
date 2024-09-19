import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity } from '../redux/reducers/CartSlice';
import { removeFromCart } from '../redux/reducers/CartSlice';

function Counter({ productId }) {
    const dispatch = useDispatch();

    // Get the quantity from Redux store based on productId
    const quantity = useSelector(state => {
        const item = state.cart.items.find(item => item.id === productId);
        return item ? item.quantity : 1;
    });

    useEffect(() => {
        // Dispatch the updated quantity to Redux on component mount or quantity change
        dispatch(updateQuantity({ id: productId, quantity }));
    }, [quantity, productId, dispatch]);

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
        }
        else{
            dispatch(removeFromCart(productId));
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <button
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300"
                onClick={decreaseQuantity}
            >
                -
            </button>
            <span className="px-4 py-1 bg-white border-t border-b text-gray-700">{quantity}</span>
            <button
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                onClick={increaseQuantity}
            >
                +
            </button>
        </div>
    );
}

export default Counter;
