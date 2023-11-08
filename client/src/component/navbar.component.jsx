import { FaSearch, FaHeart, FaShoppingBag } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white-800 text-black p-4 w-11/12 mx-auto">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Category Icon */}
        <div className="flex items-center space-x-2">
          <a href="/" className="text-2xl font-bold">
            Your Logo
          </a>
        </div>
        {/* Category Icons */}
        <div className="hidden md:flex space-x-5">
          <a href="#" className="hover:text-gray-400">Category 1</a>
          <a href="#" className="hover:text-gray-400">Category 2</a>
          <a href="#" className="hover:text-gray-400">Category 3</a>
          <a href="#" className="hover:text-gray-400">Category 4</a>
        </div>
        {/* Buttons on the right */}
        <div className="flex items-center space-x-7 ">
          {/* Sign In Button */}
          <button className="hover:text-gray-400">Sign In</button>
          {/* Search Button */}
          <button className="hover:text-gray-400">
            <FaSearch size={24} />
          </button>
          {/* Love Icon Button */}
          <button className="hover:text-gray-400">
            <FaHeart size={24} />
          </button>
          {/* Shopping Bag Icon Button */}
          <button className="hover:text-gray-400">
            <FaShoppingBag size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
