// customerAuthMiddleware.js

// Import necessary dependencies and models
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');


const JWT_SECRET = process.env.JWT_SECRET;

// Define a middleware function to check if the user is a customer
const customerAuthMiddleware = async (req, res, next) => {
  try {
    // Get the authentication token from the cookies
    const token = req.cookies.token;
    console.log(token)

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    // Verify and decode the token (assuming it's a JWT)
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }); // Replace 'your-secret-key' with your actual JWT secret key
    console.log('authdecoded',decoded)

    // Check if the decoded user ID corresponds to a customer in the database
    const customer = await Customer.findById(decoded.id);
    console.log("customer", customer);

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
