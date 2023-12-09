// Product-related routes
const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct,GetproductByID } = require('../controllers/productController');

// Create a product
router.post('/products', createProduct);

// List all products
router.get('/products', getProducts);
//get product by id
router.get('/products/:id',GetproductByID)
// Update a product
router.put('products/:id', updateProduct);

// Delete a product
router.delete('products/:id', deleteProduct);

module.exports = router;
