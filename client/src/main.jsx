// import React from "react";
// import { BrowserRouter } from "react-router-dom";
// import ReactDOM from "react-dom/client";
// // import { Provider } from "react-redux"; // Import the Provider
// import App from "./App.jsx";
// import "./index.css";
// import store from './app/store'
// import { Provider } from 'react-redux'

// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Routes,
//   RouterProvider,
//   Route,
// } from "react-router-dom";
// import PrivateRoute from "./component/seller/PrivateRoute.jsx";
// import HomeScreen from "./component/seller/HomeScreen.jsx";
// import Login from "./component/seller/Login.jsx";
// import Register from "./component/seller/Register.jsx";
// import SDashboard from "./component/seller/Dashboard.jsx";
// import ADashboard from "./page/Dashboard.jsx"
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route index={true} path="/" element={<HomeScreen />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register/>} />
//       {/* Private routes */}
//       <Route path="" element={<PrivateRoute />}>
//         <Route path="/dashboard" element={<SDashboard />} />
//         <Route path="/admindashboard" element={<ADashboard />} />

//       </Route>
//     </Route>
//   )
// );
// const persistor = persistStore(store);
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <RouterProvider router={router} />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
// );
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux"; // Import the Provider
import App from "./App.jsx";
import "./index.css";
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
