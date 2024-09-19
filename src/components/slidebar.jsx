import { useEffect, useState } from 'react';
import  BuyNowButton  from './BuyNowButton';
import { Link } from 'react-router-dom';

function Slidebar() {
  const [products, setProducts] = useState([]); // Array to store all items
  const [currentIndex, setCurrentIndex] = useState(0); // Index for the current slide
  const [fade, setFade] = useState(false); // Control fading effect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=5');
        const data = await response.json();
        setProducts(data); // Store all fetched products in the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Auto slide effect every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Loop back to 0 after reaching the last index
        setFade(false);
      }, 500); // Match fade duration
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [products.length]);

  // Handle manual navigation via dots
  const handleDotClick = (index) => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(false);
    }, 500); // Match fade duration
  };

  if (products.length === 0) {
    return <div>Loading...</div>; // Show loading state if no products are fetched yet
  }

  const { id, image, description, title, price } = products[currentIndex]; // Get the current product

  return (
    <Link to={`/product/${id}`}>
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex flex-row p-10 border rounded-lg h-80 w-full shadow-md items-center justify-center transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="w-1/3 h-full flex justify-center items-center">
          <img
            src={image}
            alt="Fetched from API"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex flex-col p-10 items-center justify-center w-2/3">
          <h1 className="text-2xl font-bold text-center">{description}</h1>
          <div className='flex justify-center items-center mt-10'>
          <BuyNowButton id={id} image={image} title={title} price={price} />
          </div>
          
        </div>
      </div>

      {/* Dots for controlling the slides */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-[#6C48C5]' : 'bg-gray-400'}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
    </Link>
  );
}

export default Slidebar;
