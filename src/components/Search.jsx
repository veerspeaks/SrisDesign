import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch products only once when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data); // Set the products in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts(); // Call the function
  }, []); // Empty dependency array to run only once

  // Filter products whenever searchTerm or products change
  useEffect(() => {
    const filterResults = () => {
      if (!searchTerm) {
        setFilteredProducts([]); // Clear search if no term is entered
        return;
      }

      const results = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredProducts(results);
    };

    filterResults();
  }, [searchTerm, products]); // Run this effect when searchTerm or products change

  return (
    <div className="searchbar flex pt-4 items-center relative">
      <input
        className="border border-gray-300 rounded-full px-4 py-2 w-96"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Set search term when typing
      />
      
      
      {filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 z-50">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="block p-4 border-b border-gray-200 hover:bg-[#EAE6FF] hover:shadow-sm transition-colors duration-200 ease-in-out"
          >
            <div className="flex items-center gap-2">
              <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded-full" />
              <div>
                <div className="text-gray-900 font-semibold text-lg">{product.title}</div>
                <div className="text-gray-600 text-sm mt-1">{product.category}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      )}
    </div>
  );
}

export default Search;
