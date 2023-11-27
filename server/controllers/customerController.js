const argon2 = require("argon2");
const Customer = require("../models/Customer");
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
            const token = jwt.sign({ email: customer.email, id : customer._id, role: customer.role}, JWT_SECRET, {
              expiresIn: "3h"
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

//get customer's profile
exports.getCustomerProfile = async (req, res)=>{
    try {
      const customer = req.customer;
   
      if (!customer) {
        return res.json({
          status: "FAILED",
          message: "Customer not found",
        });
      }
  
      res.json({
        status: "SUCCESS",
        message: "Customer profile retrieved successfully",
        data: {
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          // Add any other profile information you want to include
        },
      });
    } catch (err) {
      console.error(err);
      res.json({
        status: "FAILED",
        message: "An error occurred while fetching customer profile",
        error: err.message,
      });
    }
};

//search for a customer  
  exports.searchCustomers = async (req, res) => {
    try {
      const query = req.query.query; // Get the search query from the request
      const limit = parseInt(req.query.limit)  ; // Set a default limit (e.g., 10) or use the one provided in the query
      const page = parseInt(req.query.page) ; // Set a default page (e.g., 1) or use the one provided in the query
      const offset = (page - 1) * limit;
  
      // Create a MongoDB query to search for customers
      const searchCriteria = {
        $or: [
          { first_name: { $regex: query, $options: 'i' } },
          { last_name: { $regex: query, $options: 'i' } }
        ]
      };
      
     

      const sortDirection = req.query.sort === 'DESC' ? -1 : 1; // Sort direction (1 for ascending, -1 for descending)

      // Use try-catch for MongoDB queries to handle potential errors
      const [results, itemCount] = await Promise.all([
        Customer.find(searchCriteria)
          .sort({ first_name: sortDirection }) // Sort by first_name
          .limit(limit)
          .skip(offset)
          .exec(),
        Customer.countDocuments(searchCriteria).exec()
      ]);

      const pageCount = Math.ceil(itemCount / limit);
  
      res.status(200).json({
        customers: results,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, page),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//Update the customer's profile
exports.updateCustomerProfile = async (req, res) => {
  try {
    // Get the access token from the request headers
    const token = req.cookies.token;
    console.log(token)

    // Verify the access token and extract the customer ID

    const decoded = jwt.verify(token, JWT_SECRET); 
    console.log('Decoded:', decoded);

    const customerId = decoded.id;
    console.log('customerId:', customerId);

    // Check if the customer ID exists
    if (!customerId) {
      return res.status(403).json({ message: 'Invalid access token' });
    }

    // Extract updated customer data from the request body
    const updatedData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      // Add other fields as needed
    };

    // Check if the provided email is unique
    const isEmailUnique = await Customer.findOne({ email: updatedData.email, _id: { $ne: customerId } });
    if (isEmailUnique) {
      return res.status(400).json({ message: 'Email is already in use by another customer' });
    }

    // Update the customer data
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, updatedData, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer data updated successfully', customer: updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update the customers by admins //not working
exports.updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { email, first_name, last_name, role, active } = req.body;

    // Check if the customer with the given ID exists
    const existingCustomer = await Customer.findById(customerId);
    if (!existingCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Check if the user is admin or manager
    const userRole = req.user.role;
    if (!(userRole === 'admin' || userRole === 'manager')) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check email uniqueness
    const isEmailUnique = await Customer.findOne({ email, _id: { $ne: customerId } });
    if (isEmailUnique) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Update customer data
    existingCustomer.email = email;
    existingCustomer.first_name = first_name;
    existingCustomer.last_name = last_name;
    existingCustomer.role = role;
    existingCustomer.active = active;

    // Save the updated customer
    const updatedCustomer = await existingCustomer.save();

    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = exports