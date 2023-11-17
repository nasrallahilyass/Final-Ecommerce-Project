import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,createRoutesFromElements, Routes, RouterProvider, Route  } from 'react-router-dom';
import store from './Store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'react-router-bootstrap';
import './styles/index.css';
import PrivateRoute from './components/seller/PrivateRoute.jsx';
import HomeScreen from './components/seller/HomeScreen.jsx'
import Login from './components/seller/Login.jsx';
import Register from './components/seller/Register.jsx';
import Profile from './components/seller/Profile.jsx';


const router = createBrowserRouter(
createRoutesFromElements(
  <Route path='/' element={<App/>} >
    <Route index={true} path='/' element={<HomeScreen/>}/>
    <Route  path='/login' element={<Login/>}/>
    <Route  path='/register' element={<Register/>}/>
    {/* Private routes */}
    <Route path='' element={<PrivateRoute/>}>
    <Route  path='/profile' element={<Profile/>}/>
    </Route>

  </Route>
)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
  <RouterProvider router = {router}/>
  </React.StrictMode>
  </Provider>
);
