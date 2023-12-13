
import { useEffect } from "react";
import './App.css'
import Dashboard from "./page/ADashboard.jsx";
import ProductsPage from './pages/productsPage'
import Login from "./component/seller/Login.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "./app/reducers/ProductsSlice";
// import { Table1Presentation } from "./components/DataTable";
import Products from"./page/Products"
import LangingPage from './pages/landingPage'
import SellerSingupLoginfrom from'./pages/SellerSingupLogin';
import Nav from "./components/Nav";
// import ProductsPage from './pages/productsPage'
function App() {

  return (
    <div className="App">
      {/* <Products/> */}
      {/* <LangingPage/> */}
      <SellerSingupLoginfrom/>
      {/* <LangingPage/> */}
      {/* <ProductsPage/> */}
      {/* <Dashboard/> */}
    </div>
  )
    
}

export default App
