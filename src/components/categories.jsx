import { useEffect, useState } from 'react';

// Categories component definition
export default function Categories() {
    // State to manage the scrollability of the category list
    const [isScrollable, setIsScrollable] = useState(false);
    // State to hold the fetched categories data
    const [categories, setCategories] = useState([]);
    // State to manage the visibility of the drawer
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Effect to fetch categories data on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            // Fetch categories data from the API
            const res = await fetch('https://fakestoreapi.com/products/categories');
            // Parse the response as JSON
            const data = await res.json();
            // Update the state with the fetched categories
            setCategories(data);
        };
        // Call the fetchCategories function to start the data fetching process
        fetchCategories();
    }, []);

    // Effect to check if the category list is scrollable
    useEffect(() => {
        // Function to check if the category list is scrollable
        const checkScrollability = () => {
            // Get the category list element
            const categoryList = document.getElementById('categoryList');
            // Check if the category list is scrollable
            if (categoryList && categoryList.scrollWidth > categoryList.clientWidth) {
                // If scrollable, update the state
                setIsScrollable(true);
            } else {
                // If not scrollable, update the state
                setIsScrollable(false);
            }
        };

        // Initial check for scrollability
        checkScrollability();

        // Re-check scrollability when the window resizes
        window.addEventListener('resize', checkScrollability);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', checkScrollability);
    }, []);

    // JSX for the categories component
    return (
        <div className="relative">
            <div className="flex flex-row rounded-lg pb-2 shadow-md bg-[#FFF7F7]">
                {/* Flex container for the toggle button */}
                <div className="flex items-center pr-4">
                    <button
                        className="bg-[#4F75FF] hover:bg-[#3A5CCC] text-white py-2 px-4 rounded-r-full"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 inline-block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        {/* Conditionally render the text */}
                        {!isScrollable && <span className="ml-2">Browse Categories</span>}
                    </button>
                </div>

                <div
                    id="categoryList"
                    className="flex rounded-lg overflow-x-auto scrollbar-hide"
                    style={{
                        scrollbarWidth: "none", /* Firefox */
                        msOverflowStyle: "none", /* IE and Edge */
                        WebkitOverflowScrolling: 'touch', /* Smooth scrolling for iOS */
                    }}
                >
                    <ul className="flex w-full flex-row justify-between gap-4 px-4">
                        {categories.map((category) => (
                            <li 
                                key={category}
                                className="rounded-full py-2 px-4 bg-[#6C48C5] text-white hover:bg-[#A162E8] transition-colors duration-200 whitespace-nowrap"
                            >
                                <a href={`/products/${category}`}>{category}</a>
                            </li>
                        ))}
                        <li className="rounded-full py-2 px-8 bg-[#4F75FF] text-white hover:bg-[#A162E8] transition-colors duration-200 whitespace-nowrap">
                            <a href="/customdesign" className="flex items-center gap-2">
                                Customize Purchase? Tell us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Sliding drawer for vertical categories */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-50 ${
                    isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-4 bg-[#4F75FF] text-white text-lg font-semibold">
                    Categories
                </div>
                <ul className="p-4 space-y-4">
                    {categories.map((category) => (
                        <li key={category} className="py-2 px-4 bg-[#6C48C5] text-white rounded-full hover:bg-[#A162E8] transition-colors">
                            <a href={`/products/${category}`}>{category}</a>
                        </li>
                    ))}
                </ul>
                <button
                    className="absolute top-4 right-4 text-black"
                    onClick={() => setIsDrawerOpen(false)}
                >
                    Close
                </button>
            </div>

            {/* Overlay for when the drawer is open */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50"
                    onClick={() => setIsDrawerOpen(false)}
                />
            )}
        </div>
    );
}
