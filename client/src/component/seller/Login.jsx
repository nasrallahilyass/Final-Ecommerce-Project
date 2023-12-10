import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';


import http from '../../utils/http';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sellerInfo, jwt } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (jwt) {
      navigate('/dashboard');
    }
  }, [navigate, jwt]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    console.log('Email:', email);
    console.log('Password:', password);
  
    try {
      const response = await http.post('/users/login', { email, password });
      dispatch(setCredentials({ ...response.data }));
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-8 bg-white shadow-lg rounded">
      <h1 className="text-3xl mb-6 font-bold">Sign In</h1>

      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isLoading && <Loader />}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Sign In
        </button>

        <div className="py-3 text-center">
          <span>New Seller? </span>
          <Link to="/register" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;