import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../app/reducers/ProductsSlice";
import { Table1 } from "../components/Table";
import { useCallback } from "react";

export default function Products() {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsList.products);
  console.log('products',products);
  const status = useSelector((state) => state.productsList.status);
  // const getProducts = useCallback(fetchAllProducts, [])
  useEffect(() => {
  // console.log("Rendering Products component");

    // if (status === "idle") {
      dispatch(fetchAllProducts());
      console.log('ff')
    // }
  }, []);

  if (status === "pending") 
    return <p>Loading...</p>;
  

  if (status === "rejected")
    return <p>Error fetching products.</p>;
  
  console.log('pr',products )
  return (
    <div className="flex flex-col overflow-auto py-4 sm:py-0">
      <Table1 data={products} />
    </div>
  );
}
