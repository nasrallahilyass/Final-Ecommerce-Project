import { useState , useEffect} from "react";
import {Link} from 'react-router-dom';
import { Form,Button} from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useDispatch,useSelector } from "react-redux"; 
import { toast } from 'react-toastify';
import Loader from "./Loader";
import { setCredentials } from "../../slices/authSlice";
import {useNavigate} from 'react-router-dom';
import { useUpdateSellerMutation } from "../../slices/sellersApiSlice";



function Profile() {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {sellerInfo} = useSelector((state)=> state.auth);

    const [updateProfile, {isLoading}] = useUpdateSellerMutation();
    
    useEffect(() =>{
        setFirstname(sellerInfo.firstname);
        setLastname(sellerInfo.lastname);
        setUsername(sellerInfo.username);
        setEmail(sellerInfo.email);

    },[sellerInfo.setFirstname,sellerInfo.setLastname,sellerInfo.setUsername,sellerInfo.setEmail]);

    const submitHandler = async(e) =>{
        e.preventDefault();
        if(password!== confirmPassword){
            toast.error('Passwords do not match')
        }else{
           try {
            const  res = await updateProfile({
              _id: sellerInfo._id,
              firstname,
              lastname,
              username,
              email,
              password,
            }).unwrap()
            dispatch(setCredentials({...res}));
            toast.success('Profile Updated')
           } catch (err) {
            toast.error(err?.data?.message ||err.error);
           }
        
    }
  return (
    <FormContainer>
        <h1>Update Profile</h1>

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
            {isLoading && <Loader/>}
            <Button type="submit" variant="primary" className="mt-3">
                Update
            </Button>
        </Form>
    </FormContainer>
  )
}};

export default Profile 
