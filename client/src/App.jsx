
import { useEffect } from "react";
import './App.css'
import Dashboard from "./page/dashboard";
import ProductsPage from './pages/productsPage'

import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./app/reducers/ProductsSlice";
import { Table1Presentation } from "./components/DataTable";


import LangingPage from './pages/landingPage'
// import ProductsPage from './pages/productsPage'


function App() {

  return (
    <>
      <LangingPage/>
      {/* <ProductsPage/> */}
      {/* <Dashboard/> */}
    </>
  )
    
}

export default App
