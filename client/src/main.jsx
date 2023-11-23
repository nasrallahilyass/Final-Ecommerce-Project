import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
  RouterProvider,
  Route,
} from "react-router-dom";
import store from "./Store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "react-router-bootstrap";
import "./styles/index.css";
import PrivateRoute from "./components/seller/PrivateRoute.jsx";
import HomeScreen from "./components/seller/HomeScreen.jsx";
import Login from "./components/seller/Login.jsx";
import Register from "./components/seller/Register.jsx";
import Dashboard from "./components/seller/Dashboard.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
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
