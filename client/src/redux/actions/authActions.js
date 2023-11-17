// authActions.js
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../types';

// Register user action
export const registerUser = (formData) => async (dispatch) => {
  try {
    // Make an API call to your backend
    const response = await axios.post('/api/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data, // You might want to modify this based on your backend response
    });

    // Optionally, you can dispatch other actions or perform additional tasks
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response ? error.response.data : 'Server Error',
    });
  }
};
