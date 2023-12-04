import { useEffect } from "react";
import Dashboard from "./page/dashboard";

import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./app/reducers/ProductsSlice";
import { Table1Presentation } from "./components/DataTable";


export default function App() {
  return (
    <div className="App">
      <Dashboard/>
    </div>
  )
}