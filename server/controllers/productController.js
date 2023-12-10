// Controller for product-related operations
const Product = require('../models/Product');
const SubCategorie = require('../models/Subcategory')
const Categorie =require('../models/Categorie')

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
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find({}).populate('subcategory_id');
//     if(!products){
//         return res.status(404).json({message : "thereIs no products"})
//     }
//     const formattedproducts = products.map((product) => ({ 
//       __id: product._id,
//       Product_name: product.Product_name,
//       subcategory_id: product.subcategory_id._id.toString(), // Convert to string
//       subcategory_name: product.subcategory_id.subcategory_name,
//       category_name: categorieName,
//       active: product.active,
//     }));
//   res.status(200).json({ data: formattedproducts });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }

// }
// List products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('subcategory_id');
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "There are no products" });
    }

    const formattedProducts = await Promise.all(products.map(async (product) => {
      try {
        // Access subcategory information
        const subcategory = product.subcategory_id;

        // Find the category using the category_id from the subcategory
        const category = await Categorie.findById(subcategory.categorie_id);

        return {
          _id: product._id,
          product_image:product.product_image,
          Product_name: product.Product_name,

          subcategory_id: product.subcategory_id._id.toString(), // Convert to string
          subcategory_name: product.subcategory_id.subcategory_name,
          short_description : product.short_description,
          long_description:product.long_description,
          price : product.price,
          discount_price :product.discount_price,
          options : product.options,
          seller_id: product.seller_id,
          category_id : category._id,
          category_name: category.category_name,
          active: product.active,
        };
      } catch (error) {
        console.error(`Error processing product with ID ${product._id}:`, error);
        return {
          _id: product._id,
        Product_name: product.Product_name,
        subcategory_id: product.subcategory_id._id.toString(), // Convert to string
        subcategory_name: product.subcategory_id.subcategory_name,
        category_id : category._id,
        category_name: category.category_name,
        active: product.active,
        };
      }
    }));

    res.status(200).json({ data: formattedProducts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//list product by id
exports.GetproductByID = async(req,res)=>{
  try {
    const productId = req.params.id;
    console.log('product ID:', productId);

    if (!productId) {
      return res.status(400).json({ message: 'product ID is missing from the request' });
    }

    const product = await Product.findById(productId).populate("subcategory_id");

    if (!Product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const categorie = await Categorie.findById(product.subcategory_id.categorie_id)
    // Modify the structure of the response object
    const response = {
      _id: product._id,
      Product_name: product.Product_name,
      subcategory_id: product.subcategory_id._id.toString(), // Convert to string
      subcategory_name: product.subcategory_id.subcategory_name,
      category_id : categorie._id,
     category_name: categorie.category_name,
      active: product.active,
    };

    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Update a product
exports.updateProduct = async (req, res) => {
  const user = req.user; // User data from the token
  // if (user.role !== 'admin' && user.role !== 'manager') {
  //   return res.status(403).json({
  //     status: 'FAILED',
  //     message: 'Only users with admin or manager roles can update a category.',
  //   });
  // }
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
    //check if the product exist  and the sub category exist 
     const subtoupdate = await SubCategorie.findById(subcategory_id)
     const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductFields, { new: true });
    if (!updatedProduct|| !subtoupdate){
      res.status(404).json({message: "invvalid product id or invalid subcategory id"})
    } 
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};