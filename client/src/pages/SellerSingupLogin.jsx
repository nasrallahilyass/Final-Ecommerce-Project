import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SellerSignupLogin() {
  return (
    <>
      <ToastContainer />

      <div className="container mx-auto my-2">
        <Outlet />
      </div>
    </>
  );
}

export default SellerSignupLogin;
