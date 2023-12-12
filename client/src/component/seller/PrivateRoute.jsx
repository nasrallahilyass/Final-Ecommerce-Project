import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Sidebar from "./SideBar";

function PrivateRoute() {
  const { jwt } = useSelector((state) => state.auth);
  
  return jwt ? (
    <>
      <Header />
      <div className=" h-screen flex justify-between">
        <Sidebar />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;