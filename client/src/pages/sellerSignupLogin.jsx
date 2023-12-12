import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../component/footer.component";

function SellerSignupLogin() {
  return (
    <>
    
      <ToastContainer/>
      
      <Container className='my-2 '>
      <Outlet/>
      </Container>
     <Footer/>
    </>
  );
}

export default SellerSignupLogin;
