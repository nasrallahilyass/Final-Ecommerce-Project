import React from 'react';
import { Button } from "primereact/button";
import { Link } from 'react-router-dom';
import Footer from '../footer.component';
import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts, deleteProduct } from "../../app/reducers/ProductsSlice";
import { Table1 } from "../../components/Table";
import {Productscolumns} from "../../utils/TableColumns"

const pcolumns =Productscolumns 
export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsList.products);
  const status = useSelector((state) => state.productsList.status);

  useEffect(() => {
    console.log("Fetching products...");
    dispatch(fetchAllProducts());
  }, []);
  const handleDeleteProduct = async (productId) => {
    try {
      await dispatch(deleteProduct(productId));
      dispatch(fetchAllProducts());
      alert('product deleted succesfully')
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
 
  if (status === "pending") 
    return <p>Loading...</p>;

  if (status === "rejected")
    return <p>Error fetching products.</p>;
  
  console.log("Products:", products); // Log the response here

  return (
    <div className="flex flex-col overflow-auto py-4 sm:py-0">
      <Link to="/new-product">
      <button class="btn btn-sm">Create Product</button>
      </Link>      
        <Table1 data={products} handleActionsProductClick={handleDeleteProduct} columns={pcolumns} />
    </div>
  );
}

