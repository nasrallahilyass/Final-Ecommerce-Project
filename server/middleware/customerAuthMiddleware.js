// customerAuthMiddleware.js

// Import necessary dependencies and models
const jwt = require('jsonwebtoken');
const Customer = require('../models/customerModel');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Define a middleware function to check if the user is a customer
const customerAuthMiddleware = async (req, res, next) => {
  try {
    // Get the authentication token from the request headers (you may use cookies, sessions, or other methods)
    // const token = req.header('Authorization')
    
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
     
                 
     //
     
    // Remove the "Bearer " prefix from the token
    // if (token.startsWith('Bearer ')) {
    //   token = token.substring(7); // Remove the first 7 characters ("Bearer ")


      
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }
 // Extract the token without the "Bearer" prefix
//  const tokenWithoutBearer = token.replace(/^Bearer\s+/i, '');
//}

    // Verify and decode the token (assuming it's a JWT) 
    // const decoded = jwt.verify(token, JWT_SECRET,{ algorithms: ['HS256'] }); // Replace 'your-secret-key' with your actual JWT secret key
    const decoded = jwt.verify(token, JWT_SECRET); // Replace 'your-secret-key' with your actual JWT secret key

    // Check if the decoded user ID corresponds to a customer in the database
    const customer = await Customer.findById(decoded.id);
    console.log("customer",customer )


    if (!customer) {
      return res.status(401).json({ message: 'Unauthorized - Invalid customer' });
    }

    // Attach the customer object to the request for later use in route handlers
    req.customer = customer;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = customerAuthMiddleware;
