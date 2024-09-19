import { useEffect, useState, useRef } from 'react';
import Product from './Product';

function YouMayLike({link}) {
    const [products, setProducts] = useState([]);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(link);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [link]); // Added 'link' to the dependency array

    const handleScrollUp = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ top: -200, behavior: 'smooth' });
        }
    };

    const handleScrollDown = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ top: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-5xl font-bold my-10 text-white italic">You may also like...</h2>
            <div className="relative h-[600px]"> {/* Adjust height as needed */}
                {/* Up Scroll button */}
                <button
                    className="absolute left-1/2 top-0 transform -translate-x-1/2 w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center z-10 bg-gray-300 text-black transition-colors"
                    onClick={handleScrollUp}
                >
                    &#8593; {/* Up arrow */}
                </button>

                {/* Scrollable container */}
                <div
                    ref={scrollContainerRef}
                    className="flex flex-col overflow-y-scroll gap-4 p-4 h-full"
                    style={{ 
                        scrollBehavior: 'smooth',
                        msOverflowStyle: 'none',  /* IE and Edge */
                        scrollbarWidth: 'none'  /* Firefox */
                    }}
                >
                    {products.map((product) => (
                        <Product 
                            key={product.id} 
                            id={product.id} 
                            image={product.image} 
                            title={product.title} 
                            price={product.price}
                            
                        />
                    ))}
                </div>

                {/* Hide scrollbar for Webkit browsers */}
                <style jsx>{`
                    .flex::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>

                {/* Down Scroll button */}
                <button
                    className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center z-10 bg-gray-300 text-black text-bold transition-colors"
                    onClick={handleScrollDown}
                >
                    &#8595; {/* Down arrow */}
                </button>
            </div>
        </div>
    );
}

export default YouMayLike;