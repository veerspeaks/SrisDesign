import Product from './Product'; // Import Product component for rendering products
import { useEffect, useState, useRef } from 'react'; // Import React hooks for state management and DOM manipulation

// CatDisplay component definition
function CatDisplay({ link, categoryTitle, categoryDescription, gradColor1, gradColor2 }) {
    // State to hold the fetched products
    const [products, setProducts] = useState([]);
    // Ref to access the scroll container DOM node
    const scrollContainerRef = useRef(null); // Use ref for scroll container

    // Effect to fetch products data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the provided link
                const response = await fetch(link);
                // Parse the response as JSON
                const data = await response.json();
                // Update the state with the fetched data
                setProducts(data);
            } catch (error) {
                // Log any errors encountered during data fetching
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function to start the data fetching process
        fetchData();
    }, [link]);

    // Function to scroll the container to the right
    const handleScrollRight = () => {
        if (scrollContainerRef.current) {
            // Smoothly scroll the container 300px to the right
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Function to scroll the container to the left
    const handleScrollLeft = () => {
        if (scrollContainerRef.current) {
            // Smoothly scroll the container 300px to the left
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    // Extract category ID from the first product if available
    const categoryId = products.length > 0 ? products[0].category : null;

    return (
        <div className="flex flex-col" style={{ background: `linear-gradient(135deg, ${gradColor1} 0%, ${gradColor2} 100%)` }}>
            <style>{`
                /* Custom CSS to hide scrollbar */
                #scroll-container::-webkit-scrollbar {
                    display: none;
                }

                #scroll-container {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;     /* Firefox */
                }
            `}</style>
            <div className="flex flex-col lg:flex-row w-full items-center">
                {/* Left text content */}
                <div className="flex flex-col w-full lg:w-1/3 p-4">
                    <span className="text-white text-2xl font-bold">{categoryTitle}</span>
                    <span className="text-white text-xl italic">{categoryDescription}</span>
                    {categoryId && (
                        <a
                            href={`/products/${categoryId}`}
                            className="text-white text-xl italic pt-8 lg:pt-32 text-right underline cursor-pointer"
                        >
                            See More &gt;
                        </a>
                    )}
                </div>

                {/* Scrollable product list */}
                <div className="relative w-full lg:w-2/3 mt-4 lg:mt-0">
                    {/* Left Scroll button */}
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-12 lg:h-12 border border-gray-400 rounded-full flex items-center justify-center z-10 bg-gray-300 text-black transition-colors"
                        onClick={handleScrollLeft}
                    >
                        &lt;
                    </button>

                    {/* Scrollable container */}
                    <div
                        id="scroll-container"
                        ref={scrollContainerRef} // Reference the scrollable container
                        className="flex overflow-x-scroll p-4"
                        style={{ width: '100%', scrollBehavior: 'smooth' }}
                    >
                        {products.map((product) => (
                            <Product key={product.id} id={product.id} image={product.image} title={product.title} price={product.price} rate={product.rating.rate} count={product.rating.count} />
                        ))}
                    </div>

                    {/* Right Scroll button */}
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 lg:w-12 lg:h-12 border border-gray-400 rounded-full flex items-center justify-center z-10 bg-gray-300 text-black transition-colors"
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
