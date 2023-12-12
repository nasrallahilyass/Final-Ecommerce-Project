import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="max-w-sm bg-white h-screen flex flex-col  w-3/6 p-6 shadow-lg shadow-right-lg">
      <NavLink
        to="/profile"
        className="text-lg font-semibold text-black p-4 rounded-lg block transition duration-300 ease-in-out hover:bg-blue-500 focus:bg-blue-500"
        activeclassname="bg-blue-500"
      >
        Profile
      </NavLink>
      <NavLink
        to="/products"
        className="text-lg font-semibold text-black p-4 rounded-lg block transition duration-300 ease-in-out hover:bg-blue-500 focus:bg-blue-500"
        activeclassname="bg-blue-500"
      >
        Products
      </NavLink>
      <NavLink
        to="/orders"
        className="text-lg font-semibold text-black p-4 rounded-lg block transition duration-300 ease-in-out hover:bg-blue-500 focus:bg-blue-500"
        activeclassname="bg-blue-500"
      >
        Orders
      </NavLink>
    </div>
  );
}

export default Sidebar;