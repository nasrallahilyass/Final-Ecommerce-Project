import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../component/footer.component";

function SellerSignupLogin() {
  return (
    <>
      <ToastContainer/>  
      <Container className='flex flex-col  gap-4 w-screen pl-[4.25rem] '>
      <Outlet/>
      </Container>
      {/* <div className="block">
     <Footer/></div> */}
    </>
  );
}

export default SellerSignupLogin;