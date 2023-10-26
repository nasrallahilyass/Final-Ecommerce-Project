// Controller for product-related operations
const Product = require('../models/Product');
// Create a product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listproducts
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if(!products){
        return res.status(404).json({message : "thereIs no products"})
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

// Update a product
exports.updateProduct = async (req, res) => {
    const {sku, product_image, product_name,subcategory_id,short_description,long_description,price,discount_price,options,active}= req.body
    const productId = req.params.id;

  try {
    const updatedProductFields = {
      sku,
      product_name,
      subcategory_id,
      short_description,
      long_description,
      price,
      discount_price,
      options,
      active
    }

    if (product_image) {
      updatedProductFields.product_image = product_image
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductFields, { new: true });
     
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
