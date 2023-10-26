// mongoDb Users controllers
const express = require("express");
const router = express.Router();

// Import user controller
const userController = require('../controllers/userController');


// Signup route
router.post('/users', userController.signup);

// Signin route
router.post('/users/login', userController.signin);

router.get('/users', userController.getAllUsers);


module.exports = router;

