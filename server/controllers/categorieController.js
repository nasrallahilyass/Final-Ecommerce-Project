const Categorie = require('../models/Categorie');
const Subcategorie = require('../models/SubCategorie')

// Create category
exports.createCategorie = async (req, res) => {
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
 // List categories by name 

exports.getCategorieByName = async (req, res) => {
    try {
        const categoryName = req.query.query;

        // Build the query condition for an exact category name match
        const queryCondition = {
            category_name: categoryName,
        };

        const category = await Categorie.findOne(queryCondition);

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
  }


//update category




//delete Category
exports.DeleteCategory = async (req, res) => {
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


