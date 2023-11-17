// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LayoutSingUp from './Layout/LayoutSingUp';



const validationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors , setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = validationSchema.safeParse(formData);
    setErrors({});
    if (validationResult.success) {
      // Data is valid, you can proceed with form submission
      console.log('Form data is valid:', formData);
      toast.success('Form data is valid', {
        position: "top-right",
        theme: "dark",
        autoClose: 3000, // Automatically close after 3 seconds
      });
    
    } else {
      // Data is invalid, set the errors
      setErrors(validationResult.error.issues);
      console.log('Errors:', errors);
    }
  };

  return (
    <>
    <ToastContainer />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')",
        }}
      />
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <div
          className="bg-gray-100 text-gray-500 shadow-xl w-full overflow-hidden"
        >
          <div className="md:flex w-full ">
            <div className="hidden md:block w-1/3 bg-orange-200 ">
              <img src='./img/CRAFTY.png' alt='crafty' 
              className='absolute'/>
             <LayoutSingUp />
            </div>
            <div className="w-full md:w-2/3 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor="firstName" className="text-xs font-semibold px-1">
                      First name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="John"
                      />
                    </div>
                    {errors && (
                        <div className="text-red-600 text-xs flex display-start pl-2 mt-2 ">{errors[0]?.message} </div>
                     )}
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label htmlFor="lastName" className="text-xs font-semibold px-1">
                      Last name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus-border-indigo-500"
                        placeholder="Smith"
                      />
                    </div>
                    {errors && (
                <div className="text-red-600 text-xs flex display-start pl-2 mt-2 ">{errors[1]?.message} </div>
              )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="email" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus-border-indigo-500"
                        placeholder="johnsmith@example.com"
                      />
                    </div>
                    {errors && (
                <div className="text-red-600 text-xs flex display-start pl-2 mt-2 ">{errors[2]?.message} </div>
              )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label htmlFor="password" className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus-border-indigo-500"
                        placeholder="************"
                      />
                    </div>
                    {errors && (
                <div className="text-red-600 text-xs flex display-start pl-2 mt-2">{errors[3]?.message} </div>
              )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      className="block w-full max-w-xs mx-auto bg-orange-200 hover:bg-yellow-500 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
