import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="py-5">
      <div className="flex justify-center">
        <div className="p-5 flex flex-col items-center hero-card bg-light w-3/4">
          <h1 className="text-center mb-4 text-4xl">Crafty Sellers</h1>
          <p className="text-center mb-4">
            Become a part of our vibrant marketplace, where your creativity and products can thrive, connecting with customers who appreciate and value your offerings.
          </p>
          <div className="flex">
            <Link to='/login' className="text-white bg-primary px-4 py-2 rounded-md mr-3">
              Sign In
            </Link>
            <Link to='/register' className="text-white bg-secondary px-4 py-2 rounded-md">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
