import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { setCredentials } from "../../slices/authSlice";
import { toast } from 'react-toastify';
import Loader from "./Loader";
import http from "../../utils/http";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sellerInfo, jwt } = useSelector((state) => state.auth);
    
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (jwt) {
            navigate('/dashboard');
        }
    }, [navigate, jwt]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await http.post("/users/login", { email, password });
            dispatch(setCredentials({ ...response.data }));
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
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

                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>
                <Row className="py-3">
                    <Col>
                        New Seller? <Link to='/register'>Sign Up</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
}

export default Login;
