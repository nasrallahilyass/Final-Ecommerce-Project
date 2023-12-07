import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="max-w-sm bg-white h-full w-3/6 p-6 shadow-lg shadow-right-lg">
      <Link
        to="/profile"
        className="text-lg font-semibold text-black p-4 rounded-lg block"
        activeclassname="bg-gray-300"
      >
        Profile
      </Link>
      <Link
        to="/products"
        className="text-lg font-semibold text-black p-4 rounded-lg block"
        activeclassname="bg-gray-300"
      >
        Products
      </Link>
      <Link
        to="/orders"
        className="text-lg font-semibold text-black p-4 rounded-lg block"
        activeclassname="bg-gray-300"
      >
        Orders
      </Link>
    </div>
  );
}

export default Sidebar;
