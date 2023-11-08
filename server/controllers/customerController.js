const argon2 = require("argon2");
const Customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "your-secret-key-here";
const paginate = require('express-paginate'); 



// Add a new customer
exports.signup = async (req, res) => {
  // Your validation and signup logic here
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    res.json({
      status: "FAILED",
      message: "INVALID INPUT FIELDS!",
    });
  } else if (
    !/^[a-zA-Z ]*$/.test(first_name) ||
    !/^[a-zA-Z ]*$/.test(last_name)
  ) {
    console.log("Validation failed: Invalid name");
    res.json({
      status: "FAILED",
      message: "INVALID NAME ENTER",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    console.log("Validation failed: Invalid email");
    res.json({
      status: "FAILED",
      message: "INVALID EMAIL ENTER",
    });
  } else if (password.length < 8) {
    console.log("Validation failed: Weak password");
    res.json({
      status: "FAILED",
      message: "WEAK PASSWORD ENTER",
    });
  } else {
    console.log("Validation passed");
    // check if customer already exists
    try {
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        res.json({
          status: "FAILED",
          message: "Customer with the provided email already exists",
        });
      } else {
        // try to create a new customer

        // password handling with argon2
        const hashedPassword = await argon2.hash(password);

        const newCustomer = new Customer({
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          email: email.trim(),
          password: hashedPassword,
        });

        const result = await newCustomer.save();
        res.json({
          status: "SUCCESS",
          message: "Signup successful",
          data: result,
        });
      }
    } catch (err) {
      console.error(err);
      res.json({
        status: "FAILED",
        message: "An error occurred during signup",
        error: err.message, // Include the error message for debugging
      });
    }
  }
};
// login a customer & authentication
exports.signin = async (req, res) => {
  // Your signin logic here
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: 'FAILED',
      message: 'Empty credentials supplied!'
    });
  } else {
    // Check if user exists
    try {
      const customer = await Customer.findOne({ email });

      if (customer) {
        // User exists
        const hashedPassword = customer.password;
        try {
          const passwordMatch = await argon2.verify(hashedPassword, password);

          if (passwordMatch) {
            const token = jwt.sign({ email: customer.email, id : customer._id}, JWT_SECRET, {
              expiresIn: "2h"
            });

            // Set the token as an HTTP-only cookie
            res.cookie("token", token, { httpOnly: true });

            res.json({
              status: 'SUCCESS',
              message: 'Signin successful',
              customer: customer,
              token: token
            });
          } else {
            // Passwords do not match
            res.json({
              status: 'FAILED',
              message: 'Invalid password entered'
            });
          }
        } catch (err) {
          res.json({
            status: 'FAILED',
            message: 'An error occurred while comparing passwords'
          });
        }
      } else {
        res.json({
          status: 'FAILED',
          message: 'Invalid credentials entered'
        });
      }
    } catch (err) {
      res.json({
        status: 'FAILED',
        message: 'An error occurred while checking for the customer'
      });
    }
  }
};
//Get all the customers list
exports.getAllCustomers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
  
    try {
      const customers = await Customer.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
  
      res.status(200).json({ customers });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
 //Get a customer by ID 
exports.getCustomerById = async (req, res) => {
  // Get the customer's ID from the URL parameter
  const customerId = req.params.id;
 
  // Check if the user has the required role
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    return res.status(403).json({
      status: 'FAILED',
    
      message: 'Unauthorized: Only admin and manager users can access this endpoint.',
    });
  }

  try {
    // Find the customer by ID
    const foundCustomer = await Customer.findById(customerId);

    if (!foundCustomer) {
      return res.status(404).json({
        status: 'FAILED',
        message: 'Customer not found',
      });
    }

    // If the customer is found and the requester has the right role, return the customer's details
    res.status(200).json(foundCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
 //Delete a customer
 exports.deleteCustomer = async (req, res) => {
  // Get the customer's ID from the URL parameter
  const customerId = req.params.id;
  
  const customer = await Customer.findById(customerId);
  
// Only allow customer to delete his account
if (!customer) {
    return res.status(403).json({
      status: 'FAILED',
        message: 'Unauthorized: Only customer can access this endpoint.',
    });
}
try {
    // Delete the customer by ID
    await Customer.findByIdAndDelete(customerId);

    // Return a success message
    res.status(200).json({
        status: 'SUCCESS',
        message: 'Customer deleted successfully',
    });
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
}
};



module.exports = exports