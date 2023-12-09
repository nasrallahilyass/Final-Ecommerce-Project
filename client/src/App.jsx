
import { useEffect } from "react";
import './App.css'
import Dashboard from "./page/dashboard";
import ProductsPage from './pages/productsPage'

import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./app/reducers/ProductsSlice";
// import { Table1Presentation } from "./components/DataTable";
import Products from"./page/Products"
import LangingPage from './pages/landingPage'
import Login from "./component/seller/Login";
// import ProductsPage from './pages/productsPage'
function App() {

  return (
    <div className="">
      <Login/>
      {/* <Dashboard/> */}
      {/* <LangingPage/> */}
      {/* <ProductsPage/> */}
      {/* <Dashboard/> */}
    </div>
  )
    
}

export default App
