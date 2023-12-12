import React, { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../slices/authSlice';

function EditAProfile() {

  const dispatch = useDispatch();
  const { sellerInfo } = useSelector((state) => state.auth);

  const [username, setUsername] = useState(sellerInfo.username);
  const [firstName, setFirstName] = useState(sellerInfo.first_name);
  const [email, setEmail] = useState(sellerInfo.email);
  const [lastName, setLastName] = useState(sellerInfo.last_name);

  useEffect(() => {
    // You can choose to dispatch the updateUserData directly without fetching user data beforehand
    // This action will handle both updating the user data and fetching the updated data
    dispatch(
      updateUserData({
        userId: sellerInfo?._id,
        data: { username, first_name: firstName, last_name: lastName, email },
      })
    );
  }, [dispatch, sellerInfo?._id, username, firstName, lastName, email]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSave = async () => {
    try {
      console.log('Before Axios request');
      await dispatch(
        updateUserData({
          userId: sellerInfo?._id,
          data: { username, first_name: firstName, last_name: lastName, email },
        })
      );
      console.log('After Axios request');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };
  
  
  
  

  return (
    <form className="border rounded-md shadow-md p-4 mt-8 ml-8">
      <h2 className="text-xl font-semibold mb-4">Update the profile</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block font-semibold text-sm mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border border-gray-300 rounded-md w-full p-2"
          value={username}
          onChange={handleUsernameChange}
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label htmlFor="firstName" className="block font-semibold text-sm mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="border border-gray-300 rounded-md w-full p-2"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block font-semibold text-sm mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="border border-gray-300 rounded-md w-full p-2"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold text-sm mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded-md w-full p-2"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </form>
  );
}

export default EditAProfile;