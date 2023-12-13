import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Nav";
import Sidebar from "../../components/Sidebar";

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
}useSelector
export default PrivateRoute;