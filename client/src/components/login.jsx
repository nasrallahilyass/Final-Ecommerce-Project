import React, { useState } from 'react';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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
      toast.success("Login susccessfull", {
        position: "top-right",
        theme: "dark",
        autoClose: 3000, // Automatically close after 3 seconds
      });
    } else {
      // Data is invalid, set the errors
      setErrors(
        validationResult.error.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {})
      );
    }
};


  

  return (
    <section>
       <ToastContainer />
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="justify-center mx-auto text-left align-bottom transition-all transform bg-white rounded-lg sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
            <div className="w-full px-6 py-3">
              <div>
                <div className="mt-3 text-left sm:mt-5">
                  <div className="inline-flex items-center w-full">
                    <h3 className="text-lg font-bold text-neutral-600 leading-6 lg:text-5xl">Login</h3>
                  </div>
                  <div className="mt-4 text-base text-gray-500">
                    <p>Sign up and get our newest news.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
              <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold px-1"
                    >
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
                    {errors.email && (
                      <div className="text-red-600 text-xs flex pl-2 mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold px-1"
                    >
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
                    {errors.password && (
                      <div className="text-red-600 text-xs flex display-start pl-2 mt-2">
                        {errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mt-4 lg:space-y-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Login
                  </button>
                  <a href="#" type="button" className="inline-flex justify-center py-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm">
                    Forgot your Password?
                  </a>
                </div>
              </div>
            </div>
            <div className="order-first hidden w-full lg:block">
              <img
                className="object-cover h-full bg-cover rounded-l-lg"
                src="img/CRAFTY.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;