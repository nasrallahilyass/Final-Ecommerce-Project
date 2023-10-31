//handlers for subcategories
const Categorie = require('../models/Categorie');
const SubCategorie = require('../models/SubCategorie');

//create subctegory 
exports.CreateSubcategory = async (req, res) => {
    try {
        const { subcategory_name, category_id, active } = req.body;

        // Find the category by name 
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

exports.GetAllSubcategories = async (req, res) => {
    try {
        const subcategories = await SubCategorie.find();
        res.status(200).json({ data: subcategories })
    } catch(err) {
        console.log(err);
    }
}