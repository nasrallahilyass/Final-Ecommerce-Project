// mongoDb Users controllers
const express = require("express");
const router = express.Router();

// Import user controller
const userController = require('../controllers/userController');


// Add a new user route
router.post('/users', userController.signup);


// Signin and perform a user authentication route
router.post('/users/login', userController.signin);


// Get all the users list route
router.get('/users', userController.getAllUsers);


// Get a user by ID route
router.get('/users/:id', userController.getUserById);


// Search for a user route 
router.get('/user', userController.searchUsers);


// Update the user's data route
router.put('/users/:id', userController.updateUser);


// Delete a user route
router.delete('/users/:id', userController.deleteUser);




module.exports = router;

