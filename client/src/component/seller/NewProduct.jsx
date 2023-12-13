import React, { useState, useEffect } from "react";
import Footer from "../footer.component";
import { useNavigate } from 'react-router-dom';
import http from "../../utils/http";
import { useSelector } from 'react-redux';
import { 
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,} from 'firebase/storage';
import {app} from '../../utils/firebase';

const NewProduct = ({ onProductSubmit }) => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    sku: "",
    product_image: [],
    Product_name: "",
    subcategory_id: "",
    short_description: "",
    long_description: "",
    price: 0,
    discount_price: 0,
    options: "",
    active: false,
  });

  const { sellerInfo } = useSelector((state) => state.auth)
  const [sellerId, setSellerId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);


  console.log(formData);

  const handleImageSubmit = async () => {
    setUploading(true);
    setImageUploadError(false);
  
    try {
      const urls = await Promise.all(files.map(storeImage));
      setFormData({
        ...formData,
        product_image: formData.product_image.concat(urls),
      });
      setUploading(false);
    } catch (err) {
      console.error('Image upload failed:', err);
      setImageUploadError('Image upload failed (2 MB max per image)');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      product_image: formData.product_image.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await http.get("/subcategorie");

        // Check if response.data is an array before setting it as subcategories
        if (Array.isArray(response.data.data)) {
          setSubcategories(response.data.data);
        } else {
          console.error("Invalid data format for subcategories:", response.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();

    // Placeholder logic to obtain sellerId (depends on your authentication setup)
    // This is just an example and you need to replace it with your actual logic
    const placeholderGetSellerId = () => {
      // Assuming sellerInfo has an _id property
      const { _id: sellerIdFromInfo } = sellerInfo;

      // Check if sellerIdFromInfo is not undefined or null
      if (sellerIdFromInfo) {
        setSellerId(sellerIdFromInfo);
      } else {
        console.error("Seller ID is undefined or null.");
      }
    };

    placeholderGetSellerId();
  }, [sellerInfo]); // Add sellerInfo to the dependency array


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure sellerId is set before including it in numericFormData
      if (!sellerId) {
        console.error("Seller ID is undefined or null.");
        return;
      }
      // Convert 'price' and 'discount_price' to numbers
      const numericFormData = {
        ...formData,
        price: parseFloat(formData.price),
        discount_price: parseFloat(formData.discount_price),
        seller_id: sellerId, // Include the seller ID in the data
      };
      // Post the new product data to the server
      const response = await http.post("/products", numericFormData);

      // Assuming the server responds with the created product
      const createdProduct = response.data;

      // Ensure onProductSubmit is a function before calling it
      if (typeof onProductSubmit === "function") {
        // Call the onProductSubmit function with the created product data
        onProductSubmit(createdProduct);
         // Show a toast notification for successful product creation
      toast.success('Product created successfully!', {
        position: "top-right",
        autoClose: 3000,
        // ... (other options)
      });
      }
      navigate('/products');
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleCheckboxChange = (option) => {
    // Update the formData.options array based on checkbox selection
    setFormData((prevData) => {
      if (prevData.options.includes(option)) {
        // If the option is already selected, remove it
        return {
          ...prevData,
          options: prevData.options.filter((item) => item !== option),
        };
      } else {
        // If the option is not selected, add it
        return {
          ...prevData,
          options: [...prevData.options, option],
        };
      }
    });
  };
  

  return (
    <>
      <div className="container mx-auto mt-8 flex justify-center">
        <div className="w-200 border p-6 rounded-md">
          <h1 className="text-3xl font-bold mb-4">New Product</h1>
          <form onSubmit={handleSubmit}>
            {/* Input for SKU */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                SKU <span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Input for Product Image */}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Image <span className="text-red-500">*</span>:
              </label>
              <div className='flex flex-col flex-1 gap-4'>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='Product_image'
              accept='image/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.product_image.length > 0 &&
            formData.product_image.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
            </div> 
            {/* Input for Product Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Product Name <span className="text-red-500">*</span>:
              </label>
              <input
                type="text"
                name="Product_name"
                value={formData.Product_name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Dropdown for Subcategory */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Subcategory <span className="text-red-500">*</span>:
              </label>
              <select
                name="subcategory_id"
                value={formData.subcategory_id}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              >
                <option value="" disabled>
                  Select Subcategory/Category
                </option>
                {subcategories &&
                  subcategories.map((subcategory) => (
                    <option
                      key={subcategory._id}
                      value={subcategory._id}
                    >
                      {subcategory.subcategory_name} / {subcategory.category_name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Input for Short Description */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Short Description <span className="text-red-500">*</span>:
              </label>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Input for Long Description */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Long Description:
              </label>
              <textarea
                name="long_description"
                value={formData.long_description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>

            {/* Input for Price */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price <span className="text-red-500">*</span>:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price !== 0 ? formData.price : ""}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
            </div>

            {/* Input for Discount Price */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Discount Price:
              </label>
              <input
                type="number"
                name="discount_price"
                value={
                  formData.discount_price !== 0 ? formData.discount_price : ""
                }
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>

            
            {/* Input for Options */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Options:
              </label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="small"
                    checked={formData.options.includes("small")}
                    onChange={() => handleCheckboxChange("small")}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Small</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="medium"
                    checked={formData.options.includes("medium")}
                    onChange={() => handleCheckboxChange("medium")}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Medium</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="large"
                    checked={formData.options.includes("large")}
                    onChange={() => handleCheckboxChange("large")}
                    className="form-checkbox h-5 w-5 text-blue-500"
                  />
                  <span className="ml-2">Large</span>
                </label>
              </div>
            </div>
            

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >  
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default NewProduct;