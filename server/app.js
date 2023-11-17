// Main application file
require('dotenv').config();
require('./config/database')
const UserRouter = require("./routes/userRoutes")
const bodyParser = require('express').json;
const express = require("express");
const cors = require("cors");
const cookie = require('cookie-parser')
const port = process.env.PORT || 5000; 
// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers if needed
});

export default rootReducer;



const app = express();



// Midll
app.use(bodyParser())
app.use(cookie())
app.use('/v1',UserRouter)

app.use(cors());
app.use(express.json());



app.listen(port, (err, res) => {
  console.log(`server is Running : http://localhost:${port}`);
});