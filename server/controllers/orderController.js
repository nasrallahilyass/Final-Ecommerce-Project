const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Add body parsing middleware
router.use(express.json()); 

// Define a route to create a new order
router.post('/orders', async (req, res) => {
    try {
        console.log(req.body);
        const orderData = req.body;
        const newOrder = new Order({
            ...req.body
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new order' });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter, default to page 1 if not specified
        const pageSize = 10; // Set the number of orders to display per page

        // Calculate the skip value based on the page number and page size
        const skip = (page - 1) * pageSize;

        // Use the `skip` and `limit` methods to implement pagination
        const orders = await Order.find()
            .skip(skip)
            .limit(pageSize);

        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
});

// Define a route to get an order by ID
router.get('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;

        // Use the `findById` method to find an order by its ID
        const order = await Order.findById(orderId);

        if (!order) {
            // If the order with the given ID is not found, return a 404 Not Found response
            return res.status(404).json({ error: 'Order not found' });
        }

        // If the order is found, return it in the response
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve the order' });
    }
});

router.put('/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        // Use the `findByIdAndUpdate` method to update the order status by its ID
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            // If the order with the given ID is not found, return a 404 Not Found response
            return res.status(404).json({ error: 'Order not found' });
        }

        // If the order is found and the status is updated, return the updated order in the response
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the order status' });
    }
});


module.exports = router;
