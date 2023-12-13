const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const adminAuthenticated = require("../middleware/authMiddleware");
const customerAuthMiddleware = require('../middleware/customerAuthMiddleware')
 
// Create a new customer
router.post("/create",customerController.signup );

// Login a customer
router.post("/login",customerController.signin );

//search for a customer 
router.get('/search',customerController.searchCustomers);

//get all customers  
router.get('/costumers',customerController.getAllCustomers);

//get customer profile
router.get('/profile', customerAuthMiddleware, customerController.getCustomerProfile);

//Update the customer's profile
router.patch('/profile/update', customerController.updateCustomerProfile);

//get a customer by id 
router.get('costumers/:id',customerController.getCustomerById);

// delete the customer's account
router.delete('costumers/:id', customerAuthMiddleware,customerController.deleteCustomer);

//Update the customers by admins 
router.put('costumers/:id', customerController.updateCustomer);







module.exports = router;
