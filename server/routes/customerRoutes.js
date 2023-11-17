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
router.get('/search',adminAuthenticated,customerController.searchCustomers);

//get all customers  
router.get('/',adminAuthenticated,customerController.getAllCustomers);


//get customer profile
router.get('/profile', customerAuthMiddleware, customerController.getCustomerProfile);

//Update the customer's data
router.patch('/profile/update', customerAuthMiddleware, customerController.updateCustomerProfile);

//get a customer by id 
router.get('/:id',adminAuthenticated,customerController.getCustomerById);

// delete the customer's account
router.delete('/:id', customerAuthMiddleware,customerController.deleteCustomer);






module.exports = router;
