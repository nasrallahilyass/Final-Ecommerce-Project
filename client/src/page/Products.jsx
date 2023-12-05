import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../app/reducers/ProductsSlice";
import { Table1Presentation } from "../components/DataTable";


export default function Products() {

  const dispatch = useDispatch()

 const products = useSelector(state => state.productsList.products)

 useEffect(() => {
  dispatch(fetchAllProducts());
 }, [])
 
 console.log(products)

  return (
    <div className="App">
      <Table1Presentation products={products} />

      
    </div>
  )
}