import NewProduct from "./NewProduct";
import Products from "./Products";
import { useState } from "react";



function Dashboard() {

    const [products, setProducts] = useState([]);
  
    const addProduct = (newProduct) => {
      console.log('New product:', newProduct);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    };
  return (
    <>
      <NewProduct onProductSubmit={addProduct} />
      <Products productList={products} />
    </>
  );
}

export default Dashboard;
