import Counter from './Counter'; // Importing the Counter component
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/reducers/CartSlice'; // Import removeItem action

function ShowCart() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch(); // Add dispatch to handle delete action

    const handleDeleteItem = (id) => {
        dispatch(removeFromCart(id)); // Dispatch delete action
    };

    return (
        <div className="cart-table max-w-4xl mx-auto my-8 p-4 shadow-lg rounded-lg bg-white">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#FFF7F7] border-b-2 border-purple-500">
                        <th className="py-2 px-4 text-left">Product</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4">Quantity</th>
                        <th className="py-2 px-4">Subtotal</th>
                        <th className="py-2 px-4"></th> {/* New header for actions */}
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="py-4 px-4 flex items-center">
                                <img src={item.image} alt={item.name} className="w-12 h-12 mr-4 rounded-md" /> 
                                <span>{item.name}</span>
                            </td>
                            <td className="py-4 px-4 text-center">${item.price.toFixed(2)}</td>
                            <td className="py-4 px-4 text-center">
                                {/* Counter component */}
                                <Counter initialQuantity={item.quantity} productId={item.id} />
                            </td>
                            <td className="py-4 px-4 text-center">${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="py-4 px-4 text-center">
                                <button onClick={() => handleDeleteItem(item.id)} className="text-violet-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </td>
                        </tr>   
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowCart;
