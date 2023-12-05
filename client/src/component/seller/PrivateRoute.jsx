import { Navigate,Outlet } from "react-router-dom";
import {  useSelector } from "react-redux";



function PrivateRoute() {

    const {jwt} = useSelector((state)=>(state.auth))
    console.log(jwt)
  return ( jwt? <Outlet/>: <Navigate to='/login' replace/> )
}

export default PrivateRoute 