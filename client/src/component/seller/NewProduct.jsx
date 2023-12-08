import React, { useState } from 'react';

const NewProduct =({onProductSubmit}) => {
  const [formData, setFormData] = useState({
    sku: '',
    product_image: '',
    Product_name: '',
    subcategory_id: '',
    short_description: '',
    long_description: '',
    price: 0,
    discount_price: 0,
    options: [],
    active: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        // Ensure onProductSubmit is a function before calling it
        if (typeof onProductSubmit === 'function') {
          // Call the onProductSubmit function with the form data
          onProductSubmit(formData);
      }

};


  return (
  <div className="container mx-auto mt-8 flex justify-center">
  <div className="w-full max-w-md border p-6 rounded-md">
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Image <span className="text-red-500">*</span>:</label>
          <input
            type="text"
            name="product_image"
            value={formData.product_image}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        {/* Input for Product Name */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Product Name <span className="text-red-500">*</span>:</label>
        <input
            type="text"
            name="Product_name"
            value={formData.Product_name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
        />
        </div>

        {/* Input for Subcategory ID */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Subcategory ID <span className="text-red-500">*</span>:</label>
        <input
            type="text"
            name="subcategory_id"
            value={formData.subcategory_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
        />
        </div>

        {/* Input for Short Description */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Short Description <span className="text-red-500">*</span>:</label>
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
        <label className="block text-gray-700 text-sm font-bold mb-2">Long Description:</label>
        <textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
        />
        </div>

        {/* Input for Price */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price <span className="text-red-500">*</span>:</label>
        <input
            type="number"
            name="price"
            value={formData.price !== 0 ? formData.price : ''}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
        />
        </div>

        {/* Input for Discount Price */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Discount Price:</label>
        <input
            type="number"
            name="discount_price"
            value={formData.discount_price !== 0 ? formData.discount_price : ''}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
            
        />
        </div>

        {/* Input for Options */}
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Options:</label>
        <input
            type="text"
            name="options"
            value={formData.options}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
        />
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
  );
}

export default NewProduct;
