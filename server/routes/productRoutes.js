// Product-related routes
const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Create a product
router.post('/products', createProduct);

// List all products
router.get('/products', getProducts);
//get product by id


// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
