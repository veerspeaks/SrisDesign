import { useState, useEffect } from "react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import AddtoWishlistButton from "./AddtoWishlistButton";
import Reviews from "./Reviews";
import CatDisplay from "./CatDisplay";

function ProductDetails({ id }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [backgroundGradient, setBackgroundGradient] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [additionalInformation, setAdditionalInformation] = useState(
    "Additional information"
  );

  const generateGradient = () => {
    return `linear-gradient(135deg, #${Math.floor(
      Math.random() * 16777215
    ).toString(16)} 0%, #${Math.floor(
      Math.random() * 16777215
    ).toString(16)} 100%)`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setBackgroundGradient(generateGradient()); // Set the background gradient after fetching product
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      // Check if images is an array or single image
      if (Array.isArray(product.images)) {
        setSelectedImage(product.images[0]); // Use first image from array
      } else if (product.image) {
        setSelectedImage(product.image); // Use single image field
      }
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      {/* For mobile version, make sure height and overflow are handled */}
      <div className="flex flex-col md:flex-row items-center justify-center h-auto md:mb-0">
        <div className="flex flex-row gap-2 w-full md:w-1/2">
          <div className="flex flex-col items-center">
            {/* Check if images is an array */}
            {Array.isArray(product.images) ? (
              product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.title}
                  className="w-24 h-24 md:w-32 mb-4 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                  style={{
                    border:
                      selectedImage === image ? "2px solid #6C48C5" : "none",
                  }}
                />
              ))
            ) : (
              // Render a single image if it's not an array
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 mb-4 cursor-pointer"
                onClick={() => setSelectedImage(product.image)}
                style={{
                  border:
                    selectedImage === product.image ? "2px solid #6C48C5" : "none",
                }}
              />
            )}
          </div>
          <div className="flex-grow">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-contain"
              style={{ maxHeight: "500px" }} // Set a fixed height for the image container
            />
          </div>
        </div>

        <div
          className="flex flex-col gap-10 w-full pl-3 md:w-1/2 pt-10 md:pl-10"
          style={{
            background: backgroundGradient,
          }}
        >
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-4">{product.title}</h1>
          <p className="text-4xl md:text-5xl text-white font-bold">₹{80 * product.price}</p>
          <p className="text-base md:text-lg text-white mb-4">{product.description}</p>

          <div className="mb-4 flex ">
            <label htmlFor="size" className="text-white">
              Size:
            </label>
            <select
              id="size"
              className="form-select block w-32 ml-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 md:text-sm"
            >
              <option value="">Select a size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>

          <Reviews rate={product.rating.rate} count={product.rating.count} />

          <div className="flex flex-row gap-4">
            <AddToCartButton id={product.id} image={product.image} title={product.title} price={product.price} />
            <BuyNowButton id={product.id} image={product.image} title={product.title} price={product.price} />
            <AddtoWishlistButton id={product.id} image={product.image} title={product.title} price={product.price} />
          </div>

          <div className="flex gap-4">
            <p
              onClick={() =>
                setAdditionalInformation(product.description)
              }
              className={`text-white ${
                additionalInformation === product.description
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              Additional information
            </p>
            <p
              onClick={() => setAdditionalInformation("At Sri's Design, we pride ourselves on providing exceptional shipping and returns services to ensure a seamless shopping experience for our customers. We offer fast and reliable shipping options, with most orders processed and dispatched within 24 hours. Our standard shipping typically takes 3-5 business days, while expedited shipping options are available for those who need their items sooner. We also provide international shipping to over 100 countries worldwide. Our returns policy is designed to be hassle-free and customer-friendly. If you are not completely satisfied with your purchase, you can return the item within 30 days of receipt for a full refund or exchange, provided the item is in its original condition and packaging. To initiate a return, simply contact our customer service team, who will guide you through the process and provide a prepaid return shipping label. Please note that certain items, such as personalized products and final sale items, are not eligible for returns. Additionally, any shipping charges incurred during the original purchase are non-refundable. For international returns, customers are responsible for return shipping costs and any applicable duties or taxes. We are committed to ensuring your satisfaction and will do everything we can to make your shopping experience with us a positive one. For more detailed information, please refer to our full Shipping and Returns Policy on our website.")}
              className={`text-white ${
                additionalInformation === "At [Your Company Name], we pride ourselves on providing exceptional shipping and returns services to ensure a seamless shopping experience for our customers. We offer fast and reliable shipping options, with most orders processed and dispatched within 24 hours. Our standard shipping typically takes 3-5 business days, while expedited shipping options are available for those who need their items sooner. We also provide international shipping to over 100 countries worldwide. Our returns policy is designed to be hassle-free and customer-friendly. If you are not completely satisfied with your purchase, you can return the item within 30 days of receipt for a full refund or exchange, provided the item is in its original condition and packaging. To initiate a return, simply contact our customer service team, who will guide you through the process and provide a prepaid return shipping label. Please note that certain items, such as personalized products and final sale items, are not eligible for returns. Additionally, any shipping charges incurred during the original purchase are non-refundable. For international returns, customers are responsible for return shipping costs and any applicable duties or taxes. We are committed to ensuring your satisfaction and will do everything we can to make your shopping experience with us a positive one. For more detailed information, please refer to our full Shipping and Returns Policy on our website."
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              Shipping & Returns
            </p>
            <p
              onClick={() => setAdditionalInformation("Reviews")}
              className={`text-white ${
                additionalInformation === "Reviews"
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              Reviews
            </p>
          </div>

          <div
            className="text-white px-8 mr-6 bg-white bg-opacity-20 rounded-lg"
            style={{ overflowY: "auto", maxHeight: "200px" }} // Adjusted height and overflow
          >
            {additionalInformation}
          </div>
        </div>
      </div>

      {/* Adjust margin for mobile below the product details */}
      <div className="md:pt-0">
        <CatDisplay
          link={`https://fakestoreapi.com/products/category/${product.category}`}
          categoryTitle={`Other ${product.category} that you may like...`}
          categoryDescription={""}
          gradColor1={"#800000"}
          gradColor2={"#DAA520"}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
