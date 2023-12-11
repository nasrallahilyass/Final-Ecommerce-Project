const Categorie = require('../models/Catigorie');
const Subcategorie = require('../models/Subcategorie')

// Create category
exports.createCategorie = async (req, res) => {
    const user = req.user; // User data from the token

  if (user.role !== 'admin' && user.role !== 'manager') {
    return res.status(403).json({
      status: 'FAILED',
      message: 'Only users with admin or manager roles can create a new category.',
    });
  }

    try {
        const { category_name, active } = req.body;
        // Check if a category already exists
        const existingCategorie = await Categorie.findOne({ category_name });
        if (existingCategorie) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCategorie = new Categorie({ category_name, active });
        await newCategorie.save();
        res.status(201).json({ message: "Category created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
//search for category 
exports.searchCategory= async (req, res) => {
  try {
    const categoryName = req.query.query;

    //  case-insensitive search 
    const categories = await Categorie.find({
      category_name: { $regex: categoryName, $options: 'i' },
    });

    if (categories.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json({ data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// get categorie by id 
exports.getCategorieByID = async (req, res) => {
    try {
        const categoryId = req.params.id;
    
        if (!categoryId) {
          return res.status(400).json({ message: 'Category ID is missing from the request' });
        }
    
        const category = await Categorie.findById(categoryId);
    
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
    
        res.status(200).json({ data: category });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};
//list all categories
exports.getCategorie =async(req,res)=>{
    try {
        const categories = await Categorie.find();
        if(!categories){
            return res.status(404).json({message : "thereIs no Categories"})
        }
        console.log(categories);
        res.json({data : categories});
      } catch (err) {
        res.status(500).json({ error: err.message });
      } 
};
//update category
exports.updateCategorie = async (req, res) => {
    const user = req.user; // User data from the token
  
    if (user.role !== 'admin' && user.role !== 'manager') {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Only users with admin or manager roles can update a category.',
      });
    }
  
    try {
      const categoryId = req.params.id;
      const { category_name, active } = req.body;
  
      // Check if the category exists
      const category = await Categorie.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // If category_name is provided, check for uniqueness
      if (category_name) {
        // Check if the new category_name already exists in the database
        const existingCategory = await Categorie.findOne({ category_name });
        if (existingCategory && existingCategory._id.toString() !== categoryId) {
          return res.status(400).json({ message: 'Category name already exist' });
        }
  
        category.category_name = category_name;
      }
  
      if (active !== undefined) {
        category.active = active;
      }
  
      // Save the updated category
      await category.save();
  
      res.status(200).json({ message: 'Category updated successfully', data: category });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
};
//delete Category
exports.DeleteCategory = async (req, res) => {
    const user = req.user; // User data from the token
    if (user.role !== 'admin' && user.role !== 'manager') {
      return res.status(403).json({
        status: 'FAILED',
        message: 'Only users with admin or manager roles can update a category.',
      });
    }
    const category_id = req.params.id;
    const selectedCategory = await Categorie.findById(category_id);
    if (!selectedCategory) {
        return res.status(404).json({ message: 'Category not found.' });  
    }

    const subcategoriesLength = await Subcategorie.countDocuments({ categorie_id: selectedCategory._id});
// Check if there are any subcategories associated with the category name
    if (subcategoriesLength > 0) {
        return res.status(400).json({ message: 'Category has associated subcategories. Delete subcategories first.' });
    }
// If no associated subcategories
    try {
        await Categorie.findOneAndDelete(selectedCategory);
        res.status(200).json({ message: 'Category deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
};