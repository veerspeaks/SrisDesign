import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../redux/reducers/WishSlice";
import BuyNowButton from "./BuyNowButton";


function ShowWish() {
    const wishListItems = useSelector((state) => state.wishlist.items);
    const dispatchWish = useDispatch()

    const handleDeleteItem = (id) => {
        dispatchWish(removeFromWishlist(id)); // Dispatch delete action
    };

    return (
        <div className="cart-table max-w-4xl mx-auto my-8 p-4 sm:shadow-lg rounded-lg sm:bg-white">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#FFF7F7] border-b-2 border-purple-500">
                        <th className="py-2 px-4 text-left">Product</th>
                        <th className="py-2 px-4">Price</th>
                        <th className="py-2 px-4"></th> {/*Header for Add to cart Button*/}
                        <th className="py-2 px-4"></th> {/* New header for actions */}
                    </tr>
                </thead>
                <tbody>
                    {wishListItems.map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="py-4 px-4 flex items-center">
                                <img src={item.image} alt={item.name} className="w-12 h-12 mr-4 rounded-md" /> 
                                <span>{item.name}</span>
                            </td>
                            <td className="py-4 px-4 text-center">${item.price.toFixed(2)}</td>
                            <td className="py-4 px-4 text-center"><BuyNowButton id={item.id}  image={item.image} title={item.name} price={item.price} /></td>
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

export default ShowWish;
