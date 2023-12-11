// Controller for product-related operations
// Controller for product-related operations
const Product = require("../models/Product");
const SubCategorie = require("../models/Subcategorie");

// Create a product
exports.createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listproducts--still needs pagination!
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("subcategory_id");
    if (!products) {
      return res.status(404).json({ message: "thereIs no products" });
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//list product by id

// Update a product
exports.updateProduct = async (req, res) => {
  const user = req.user; // User data from the token
  // if (user.role !== 'admin' && user.role !== 'manager') {
  //   return res.status(403).json({
  //     status: 'FAILED',
  //     message: 'Only users with admin or manager roles can update a category.',
  //   });
  // }
  const {
    sku,
    product_image,
    product_name,
    subcategory_id,
    short_description,
    long_description,
    price,
    discount_price,
    options,
    active,
  } = req.body;
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
      active,
    };
    if (product_image) {
      updatedProductFields.product_image = product_image;
    }
    //check if the product exist  and the sub category exist
    const subtoupdate = await SubCategorie.findById(subcategory_id);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductFields,
      { new: true }
    );
    if (!updatedProduct || !subtoupdate) {
      res
        .status(404)
        .json({ message: "invvalid product id or invalid subcategory id" });
    }
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
