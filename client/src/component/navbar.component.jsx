import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "../assets/images/logo.png";

// Configure Font Awesome icons
library.add(faSearch, faCartShopping);

const Navbar = () => {
  return (
    <nav className="p-4 w-11/12 mx-auto">
      <div className=" container mx-auto flex items-center justify-between">
        {/* Logo and Category Icon */}
        <div className="flex items-center space-x-2">
          <img src={logoImage} alt="" className="h-16"/>
        </div>
        {/* Category Icons */}
        <div className="hidden md:flex space-x-5 text-l">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            Product
          </a>
          <a href="#" className="hover:text-gray-400">
            Newsfeed
          </a>
          <a href="#" className="hover:text-gray-400">
            Promo
          </a>
        </div>
        {/* Buttons on the right */}
        <div className="flex items-center space-x-7">
          {/* Search Button */}
          <button className="hover:text-gray-400">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
          {/* Shopping Bag Icon Button */}
          <button className="hover:text-gray-400">
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
          </button>
          {/* Bar */}
          <button className="hover:text-gray-400">|</button>
          {/* Sign In Button */}
          <button className="hover:text-gray-400">Sign In</button>
          {/* Sign Up Button */}
          <button className="hover:text-gray-400 bg-black text-white px-2 py-2 rounded-md">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
