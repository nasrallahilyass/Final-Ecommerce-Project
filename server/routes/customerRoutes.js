const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const adminAuthenticated = require("../middleware/authMiddleware");
const customerAuthMiddleware = require('../middleware/customerAuthMiddleware')
 
// Create a new customer
router.post("/create",customerController.signup );

// Login a customer
router.post("/login",customerController.signin );

//get all customers  
router.get('/',adminAuthenticated,customerController.getAllCustomers);

//get a customer by id 
router.get('/:id',adminAuthenticated,customerController.getCustomerById);

// delete the customer's account
router.delete('/:id', customerAuthMiddleware,customerController.deleteCustomer);




module.exports = router;
