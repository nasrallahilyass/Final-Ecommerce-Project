import { Routes, Route } from 'react-router-dom';

import { useEffect } from "react";
import './App.css'
import Dashboard from "./page/dashboard";
import ProductsPage from './pages/productsPage'

import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./app/reducers/ProductsSlice";
// import { Table1Presentation } from "./components/DataTable";
import Products from"./page/Products"
import LangingPage from './pages/landingPage'
function App() {
  
  return (
    <Routes>
        <Route path='/' element={<LangingPage />} />
        <Route path="/products" element={<ProductsPage/>} />
    </Routes>
    
    // <div className="">

    //   {/* <Dashboard/> */}
    //   {/* <LangingPage/> */}
    //   {/* <ProductsPage/> */}
    //   {/* <Dashboard/> */}
    // </div>
  )
    
}

export default App
