import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from './FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import http from '../../utils/http';

function Register() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sellerInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (sellerInfo) {
      navigate('/');
    }
  }, [navigate, sellerInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const response = await http.post('/users/register', {
          username,
          first_name,
          last_name,
          role,
          email,
          password,
          confirmPassword,
        });
      
        console.log('Response from registration:', response);
      
        // Check if the response has the expected structure
        if (response.data && response.data.status === 'SUCCESS' && response.data.data) {
          const userData = response.data.data;
      
          // Check if userData is an object (not an array) and has the expected properties
          if (typeof userData === 'object' && userData.username) {
            // Dispatch the action with the correct payload
            dispatch(setCredentials({
              token: null, // Update with the actual token if available in the response
              data: [userData], // Wrap userData in an array
            }));
      
            navigate('/dashboard');
          } else {
            console.error('Invalid response format for registration');
            toast.error('Registration failed. Please try again.');
          }
        } else {
          console.error('Invalid response format for registration');
          toast.error('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
        toast.error(error?.response?.data?.message || 'Registration failed. Please try again.');
      }
      
      
    }
  };

  return (
    <FormContainer>
      <div className="mx-auto max-w-md p-8 bg-white shadow-lg rounded">
        <h1 className="text-3xl mb-6 font-bold">Sign Up</h1>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              UserName
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

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

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <input
              type="text"
              id="role"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="mb-4">
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

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
            Sign Up
          </button>

          <div className="py-3 text-center">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default Register;
