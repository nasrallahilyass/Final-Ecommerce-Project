import React from 'react';
import { Button } from "primereact/button";
import { Link } from 'react-router-dom';
import Footer from '../footer.component';

const Products = ({productList}) =>{


  return (
    <>
      <div className="flex justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {/* Your product content goes here */}
      </div>
        <div>
          <Link to="/new-product">
              <Button
                label="New Product"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              />
          </Link>
        </div>

        {/* Check if productList is defined and not empty before mapping */}
      {productList && productList.length > 0 ? (
        productList.map((product) => (
          <div key={product.id}>
            {/* Display product details as needed */}
            <p>{product.Product_name}</p>
            {/* Additional product details */}
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
      {/* Existing code */}
    </div>
    
    </>
    
    
    
  );
}

export default Products;
