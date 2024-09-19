import { useEffect, useState } from 'react';
import Product from './Product';

function Products({ link, sortOption, sortRate }) {
  const [products, setProducts] = useState([]);

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

  const sortedAndFilteredProducts = [...products]
    .filter(product => {
      if (!sortRate) return true;
      return product.rating.rate >= parseFloat(sortRate);
    })
    .sort((a, b) => {
      if (sortOption === "Low to High") return a.price - b.price;
      if (sortOption === "High to Low") return b.price - a.price;
      if (sortOption === "Rating") return b.rating.rate - a.rating.rate;
      return 0;
    });

  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {sortedAndFilteredProducts.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          image={Array.isArray(product.images) ? product.images[0] : product.image}
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
