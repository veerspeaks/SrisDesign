import { useState } from 'react'; // Import useState hook for state management
import { motion } from 'framer-motion'; // Import motion from framer-motion for animations
import Navbar from '../components/Navbar'; // Import Navbar component
import Categories from '../components/categories'; // Import Categories component
import Footer from '../components/Footer'; // Import Footer component

// CustomDesign component definition
const CustomDesign = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    productName: '',
    color: '',
    size: '',
    material: '',
    image: null,
  });

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, files } = e.target; // Extract name, value, and files from the event target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value // Update state with either the file or the value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Handle form submission logic
    console.log(formData); // Log the current form data to the console
  };

  // JSX for the CustomDesign component
  return (
      <div className="flex-col min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
      <Navbar /> {/* Navbar component */}
      <div className='w-full pb-10'>
      <Categories /> {/* Categories component */}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Animated state
        transition={{ duration: 0.5 }} // Animation transition duration
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Customize Your Product
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              name="productName"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
              placeholder="Product Name"
              onChange={handleInputChange}
            />
            <input
              name="color"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
              placeholder="Color"
              onChange={handleInputChange}
            />
            <input
              name="size"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
              placeholder="Size"
              onChange={handleInputChange}
            />
            <input
              name="material"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 md:text-sm"
              placeholder="Material"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="mt-1 block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Design
            </button>
          </div>
        </form>
      </motion.div>
      <div className='w-full pt-10'>
        <Footer /> {/* Footer component */}
      </div>
      
    </div>
  );
};

export default CustomDesign;
