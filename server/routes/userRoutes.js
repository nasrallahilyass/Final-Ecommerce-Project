const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); 

// Routes that require authentication
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

// Other routes that don't require authentication
router.post('/users/register', userController.signup);
router.post('/users/login', userController.signin);
router.get('/user', userController.searchUsers);

module.exports = router;
