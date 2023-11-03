const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.use(express.json()); 
// Define routes for orders
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrder);

module.exports = router;