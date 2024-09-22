import { useEffect, useState } from 'react'; // Import useState and useEffect hooks from react
import Product from './Product'; // Import Product component

// Define the Products component
function Products({ link, sortOption, sortRate }) {
  // Initialize state to hold the products data
  const [products, setProducts] = useState([]);

  // UseEffect hook to fetch data when the component mounts or the link changes
  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Fetch data from the provided link
        const response = await fetch(link);
        // Parse the response as JSON
        const data = await response.json();
        // Update the state with the fetched data
        setProducts(data);
      } catch (error) {
        // Log any errors that occur during data fetching
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function to start the data fetching process
    fetchData();
  }, [link]); // The effect depends on the link prop

  // Function to sort and filter products based on sortOption and sortRate
  const sortedAndFilteredProducts = [...products]
    .filter(product => {
      // If no sortRate is provided, include all products
      if (!sortRate) return true;
      // Filter products based on their rating being greater than or equal to sortRate
      return product.rating.rate >= parseFloat(sortRate);
    })
    .sort((a, b) => {
      // Sort products based on the sortOption
      if (sortOption === "Low to High") return a.price - b.price; // Sort by price from low to high
      if (sortOption === "High to Low") return b.price - a.price; // Sort by price from high to low
      if (sortOption === "Rating") return b.rating.rate - a.rating.rate; // Sort by rating from high to low
      return 0; // Default return value if no sortOption matches
    });

  // JSX to render the sorted and filtered products
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {sortedAndFilteredProducts.map((product) => (
        <Product
          key={product.id} // Use product.id as the key for each product
          id={product.id}
          image={Array.isArray(product.images) ? product.images[0] : product.image} // Determine the image to display
          title={product.title}
          price={product.price}
          rate={product.rating.rate}
          count={product.rating.count}
        />
      ))}
    </div>
  );
}

export default Products;
