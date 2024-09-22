import { useEffect } from 'react'; // Import useEffect hook for side effects
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector hooks from react-redux
import { updateQuantity } from '../redux/reducers/CartSlice'; // Import updateQuantity action from CartSlice
import { removeFromCart } from '../redux/reducers/CartSlice'; // Import removeFromCart action from CartSlice

// Counter component definition
function Counter({ productId }) {
    // Initialize dispatch function from react-redux
    const dispatch = useDispatch();

    // Use useSelector to get the quantity from Redux store based on productId
    const quantity = useSelector(state => {
        // Find the item in the cart by productId
        const item = state.cart.items.find(item => item.id === productId);
        // Return the quantity of the item if found, otherwise return 1
        return item ? item.quantity : 1;
    });

    // useEffect hook to dispatch the updated quantity to Redux on component mount or quantity change
    useEffect(() => {
        dispatch(updateQuantity({ id: productId, quantity }));
    }, [quantity, productId, dispatch]);

    // Function to increase the quantity
    const increaseQuantity = () => {
        // Calculate the new quantity by adding 1 to the current quantity
        const newQuantity = quantity + 1;
        // Dispatch the updateQuantity action with the new quantity
        dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    };

    // Function to decrease the quantity
    const decreaseQuantity = () => {
        // Check if the quantity is greater than 1
        if (quantity > 1) {
            // Calculate the new quantity by subtracting 1 from the current quantity
            const newQuantity = quantity - 1;
            // Dispatch the updateQuantity action with the new quantity
            dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
        }
        else{
            // If the quantity is 1, remove the item from the cart
            dispatch(removeFromCart(productId));
        }
    };

    // Render the Counter component
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
