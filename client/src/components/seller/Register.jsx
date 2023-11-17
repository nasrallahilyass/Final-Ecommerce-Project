import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useRegisterMutation } from "../../slices/sellersApiSlice";
import Loader from "./Loader";
import axios from 'axios'; // Import Axios
import { setCredentials } from "../../slices/authSlice";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register,{isLoading}] = useRegisterMutation();


  const { sellerInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (sellerInfo) {
      navigate('/');
    }
  }, [navigate, sellerInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        // Make a POST request to your backend API
        const response = await axios.
        post('http://localhost:3000/v1/users/register', {
          username,
          firstname,
          lastname,
          email,
          password,
        });

        // Handle the response from the server
        const { data } = response;
        dispatch(setCredentials(data));
        navigate('/');
      } catch (error) {
        // Handle errors
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="username">
                <Form.Label>UserName</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                ></Form.Control>
            </Form.Group>


            <Form.Group className="my-2" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to='/login'>Sign In</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Register;
