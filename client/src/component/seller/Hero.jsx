import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 flex flex-col items-center hero-card bg-light w-3/4 rounded-lg shadow-lg">
        <h1 className="text-center mb-4 text-4xl font-bold text-primary">Crafty Sellers</h1>
        <p className="text-center mb-6 text-gray-700 text-lg leading-loose">
          Become a part of our vibrant marketplace, where your creativity and products can thrive, connecting with customers who appreciate and value your offerings.
        </p>
        <div className="flex space-x-4">
          <Link to='/login' className="text-white bg-primary px-6 py-3 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:border-primary-dark">
            Sign In
          </Link>
          <Link to='/register' className="text-white bg-secondary px-6 py-3 rounded-md hover:bg-secondary-dark focus:outline-none focus:ring focus:border-secondary-dark">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
