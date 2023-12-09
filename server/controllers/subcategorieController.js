//handlers for subcategories
const Categorie = require('../models/Categorie');
const SubCategorie = require('../models/Subcategory')
const Product = require('../models/Product')

//create subctegory 
exports.CreateSubcategory = async (req, res) => {
    try {
        const { subcategory_name, categorie_id, active } = req.body;

        // Find the category by id
        const category = await Categorie.findById(categorie_id);

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
      const subcategories = await SubCategorie.find({}).populate("categorie_id");
      const formattedSubcategories = subcategories.map((subcategory) => ({
        _id: subcategory._id,
        subcategory_name: subcategory.subcategory_name,
        categorie_id: subcategory.categorie_id._id.toString(), // Convert to string
        category_name: subcategory.categorie_id.category_name,
        active: subcategory.active,
        __v: subcategory.__v,
      }));
      res.status(200).json({ data: formattedSubcategories });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
}

//get subcategory by id 
exports.GetAllSubcategoriByID = async(req,res)=>{
  try {
    const subcategoryId = req.params.id;
    console.log('Subcategory ID:', subcategoryId);

    if (!subcategoryId) {
      return res.status(400).json({ message: 'SubCategory ID is missing from the request' });
    }

    const subcategory = await SubCategorie.findById(subcategoryId).populate("categorie_id");

    if (!subcategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    // Modify the structure of the response object
    const response = {
      _id: subcategory._id,
      subcategory_name: subcategory.subcategory_name,
      categorie_id: subcategory.categorie_id._id.toString(), // Convert to string
      category_name: subcategory.categorie_id.category_name,
      active: subcategory.active,
      __v: subcategory.__v,
    };

    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//search for subcategory
 // Search for subcategories by query value with pagination
exports.searchSubcategories = async (req, res) => {
  try {
    const queryName = req.query.query;

    // Stage 1: Match subcategories based on the query value
    const matchStage = {
      $match: {
        subcategory_name: { $regex: queryName, $options: 'i' }, // Case-insensitive search
      },
    };

    // Stage 2: Lookup category information for each subcategory
    const lookupStage = {
      $lookup: {
        from: 'Categories', // Use the name of the category collection/table
        localField: 'categorie_id',
        foreignField: '_id',
        as: 'category',
      },
    };

    // Stage 3: Unwind the 'category' array to flatten it
    const unwindStage = {
      $unwind: '$category',
    };

    // Stage 4: Project the data to reshape the document
    const projectStage = {
      $project: {
        _id: 1,
        subcategory_name: 1,
        categorie_id: '$category._id',
        category_name: '$category.category_name',
        active: 1,
        __v: 1,
      },
    };

    // Aggregate pipeline
    const pipeline = [matchStage, lookupStage, unwindStage, projectStage];

    const subcategories = await SubCategorie.aggregate(pipeline);

    if (subcategories.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(subcategories);
  } catch (err) {
    console.error(err);
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
  }
//delete subcategory
exports.Deletesub = async (req, res) => {
  const subcategory_id = req.params.id;
  try {
      const selectedsubCategory = await SubCategorie.findById(subcategory_id);

      if (!selectedsubCategory) {
          return res.status(404).json({ message: 'SubCategory not found.' });
      }

      const productsLength = await Product.countDocuments({ subcategory_id: selectedsubCategory });

      // Check if there are any products associated with the subcategory
      if (productsLength > 0) {
          return res.status(400).json({ message: 'SubCategory has associated Products. Delete Products first.' });
      }

      // If no associated products, delete the subcategory by ID
      await SubCategorie.findByIdAndDelete(subcategory_id);
      res.status(200).json({ message: 'SubCategory deleted successfully.' });
  } catch (err) {
      res.status(500).json({ error: err?.message });
  }
}













  
