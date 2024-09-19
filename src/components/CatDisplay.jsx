import Product from './Product'; // No changes to Product component
import { useEffect, useState, useRef } from 'react';

function CatDisplay({ link, categoryTitle, categoryDescription, gradColor1, gradColor2 }) {
    const [products, setProducts] = useState([]);
    const scrollContainerRef = useRef(null); // Use ref for scroll container

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(link);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [link]);

    // Function to scroll the container to the right
    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Function to scroll the container to the left
    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    // Get category ID from the first product if available
    const categoryId = products.length > 0 ? products[0].category : null;

    return (
        <div className="flex flex-col" style={{ background: `linear-gradient(135deg, ${gradColor1} 0%, ${gradColor2} 100%)` }}>
            <style jsx>{`
                /* Custom CSS to hide scrollbar */
                #scroll-container::-webkit-scrollbar {
                    display: none;
                }

                #scroll-container {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;     /* Firefox */
                }
            `}</style>
            <div className="flex w-full items-center">
                {/* Left text content */}
                <div className="flex flex-col w-1/3">
                    <span className="text-white text-2xl font-bold px-4">{categoryTitle}</span>
                    <span className="text-white text-xl italic p-4">{categoryDescription}</span>
                    {categoryId && (
                        <a
                            href={`/products/${categoryId}`}
                            className="text-white text-xl italic pt-32 pl-4 pr-8 text-right underline cursor-pointer"
                        >
                            See More &gt;
                        </a>
                    )}
                </div>

                {/* Scrollable product list */}
                <div className="relative w-2/3">
                    {/* Left Scroll button */}
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center z-10 bg-gray-300 text-black transition-colors"
                        onClick={handleScrollLeft}
                    >
                        &lt;
                    </button>

                    {/* Scrollable container */}
                    <div
                        id="scroll-container"
                        ref={scrollContainerRef} // Reference the scrollable container
                        className="flex overflow-x-scroll gap-4 p-4"
                        style={{ width: '100%', scrollBehavior: 'smooth' }}
                    >
                        {products.map((product) => (
                            <Product key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} rate={product.rating.rate} count={product.rating.count} />
                        ))}
                    </div>

                    {/* Right Scroll button */}
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center z-10 bg-gray-300 text-black text-bold transition-colors"
                        onClick={handleScrollRight}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CatDisplay;
