import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from './FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';
import http from '../../utils/http';
import Img from '../../assets/image/mini.png';

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

        if (
          response.data &&
          response.data.status === 'SUCCESS' &&
          response.data.data
        ) {
          const userData = response.data.data;

          if (
            typeof userData === 'object' &&
            userData.username
          ) {
            dispatch(
              setCredentials({
                token: null,
                data: [userData],
              })
            );

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
        toast.error(
          error?.response?.data?.message ||
            'Registration failed. Please try again.'
        );
      }
    }
  };

  return (
    <FormContainer>
      <div className="flex flex-col min-h-screen justify-between">
        {/* Top section with the logo and form */}
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 md:mb-8 h-full">
          {/* Left side with the logo */}
          <div className="mb-4 md:mb-0 flex items-center justify-center">
            <img src={Img} alt="" className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 max-w-full" />
          </div>

          {/* Right side with the form */}
          <div className="max-w-md p-8 w-full bg-white shadow-lg rounded-md">
            <h1 className="text-3xl mb-6 font-bold text-center">Sign Up</h1>

            <form onSubmit={submitHandler} className="flex flex-wrap">
              <div className="mb-4 w-full md:w-1/2 pr-2">
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

              <div className="mb-4 w-full md:w-1/2 pl-2">
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

              <div className="mb-4 w-full md:w-1/2 pr-2">
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

              <div className="mb-4 w-full md:w-1/2 pl-2">
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

              <div className="mb-4 w-full md:w-1/2 pr-2">
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

              <div className="mb-4 w-full md:w-1/2 pl-2">
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

              <div className="mb-6 w-full md:w-1/2 pr-2">
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

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-700"
              >
                Sign Up
              </button>

              <div className="py-3 text-center w-full">
                <span>Already have an account? </span>
                <Link to="/login" className="text-blue-500">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom section with the footer */}
        <div className="py-3 text-center w-full">
          {/* ... (Footer content) ... */}
        </div>
      </div>
    </FormContainer>
  );
}

export default Register;
