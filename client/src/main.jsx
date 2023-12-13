import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  RouterProvider,
  Route,
} from "react-router-dom";
import MDashboard from "./page/MDashboard.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "react-router-bootstrap";
import "./index.css";
import PrivateRoute from "./component/seller/PrivateRoute.jsx";
import HomeScreen from "./component/seller/HomeScreen.jsx";
import Login from "./component/seller/Login.jsx";
import Register from "./component/seller/Register.jsx";
import Dashboard from "./component/seller/Dashboard.jsx";
import ADashboard from "./page/ADashboard.jsx";
import Profile from "./component/seller/Profile.jsx";
import Products from "./component/seller/Products.jsx";
import Orders from "./component/seller/Orders.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import EditProfile from "./component/seller/EditProfile.jsx";
import NewProduct from "./component/seller/NewProduct.jsx";
import Categorie from "./page/Categorie.jsx";
import Subcategories from "./page/Subcategories.jsx";
import Costumer from"./page/Costumers.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private routes */}
      <Route path="" element={<PrivateRoute />}>
        {/* <Route path="/Seller/dashboard" element={<Dashboard />} /> */}
        <Route path="/admin/dashboard" element={<ADashboard/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile/>} />
        <Route path="/products" element={<Products />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/admin/subcategories" element={<Subcategories />} />
        <Route path="/admin/categories" element={<Categorie/>} />
        <Route path="/customers" element={<Costumer/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={< MDashboard/>} />
      </Route>
    </Route>
  )
);
const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);