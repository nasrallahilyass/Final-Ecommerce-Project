import { Outlet } from "react-router-dom";
import Header from "./components/seller/header";
import { Container } from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Header/>  
      <ToastContainer/>
      <Container className='my-2 '>
      <Outlet/>
      </Container>
     
    </>
  );
}

export default App;
