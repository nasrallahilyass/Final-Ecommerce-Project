//handlers for subcategories
const Categorie = require('../models/Categorie');
const SubCategorie = require('../models/Subcategory')

//create subctegory 
exports.CreateSubcategory = async (req, res) => {
    try {
        const { subcategory_name, category_id, active } = req.body;

        // Find the category by id
        const category = await Categorie.findById(category_id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // Create the subcategory with the associated category ID
        const newSubcategory = SubCategorie.create({
            subcategory_name,
            categorie_id: category._id, // Associate with the category by its ID
            active: active || false,
        });

        res.status(201).json({ message: 'Subcategory created successfully', data: newSubcategory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//get all subcategories
exports.GetAllSubcategories = async (req, res) => {
    try {
        const subcategorie = await SubCategorie.find({}).populate("categorie_id")
        res.status(200).json({ data: subcategorie })
    } catch(err) {
        console.log(err);
    }
}
//get subcategory by id 
exports.GetAllSubcategoriByID = async(req,res)=>{
    try {
        const subcategoryId = req.params.id;
    
        if (!subcategoryId) {
          return res.status(400).json({ message: 'SubCategory ID is missing from the request' });
        }
    
        const subcategory = await SubCategorie.findById(subcategoryId ).populate("categorie_id");
    
        if (!subcategory ) {
          return res.status(404).json({ message: 'SubCategory not found' });
        }
    
        res.status(200).json({ data: subcategory});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

// Update subcategory by ID
exports.updateSubcategory = async (req, res) => {
    try {
      const { subcategory_name, category_id, active } = req.body;
      const subcategoryId = req.params.id;
  
      // Check if the subcategory exists
      const subcategory = await SubCategorie.findById(subcategoryId);
  
      if (!subcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      // Check if the new subcategory name is unique within the same category
      if (subcategory_name) {
        const existingSubcategory = await SubCategorie.findOne({
          subcategory_name,
          category_id: category_id,
          _id: { $ne: subcategoryId }, // Exclude the current subcategory being updated
        });
  
        if (existingSubcategory) {
          return res.status(400).json({ message: 'Subcategory name must be unique within the same category' });
        }
      }
      // Update subcategory properties
      if (subcategory_name) {
        subcategory.subcategory_name = subcategory_name;
      }
      if (category_id) {
        subcategory.category_id = category_id;
      }
      if (active !== undefined) {
        subcategory.active = active;
      }
  
      // Save the updated subcategory
      await subcategory.save();
  
      res.status(200).json({ message: 'Subcategory updated successfully', data: subcategory });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
//delete subcategory 

exports.deleteSubcategory = async (req, res) => {
    try {
      const subcategoryId = req.params.id;
  
      // Check if the subcategory exists
      const subcategory = await SubCategorie.findById(subcategoryId);
  
      if (!subcategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      // Perform the deletion
      await subcategory.remove();
  
      res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  
