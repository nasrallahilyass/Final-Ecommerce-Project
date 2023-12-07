import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SellerSignupLogin() {
  return (
    <>
    
      <ToastContainer/>
      
      <Container className='my-2 '>
      <Outlet/>
      </Container>
     
    </>
  );
}

export default SellerSignupLogin;
