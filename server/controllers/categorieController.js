const Categorie = require('../models/Categorie');

// Create category
exports.createCategorie = async (req, res) => {
    try {
        const { category_name } = req.body;
        // Check if a category already exists
        const existingCategorie = await Categorie.findOne({ category_name });

        if (existingCategorie) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCategorie = new Categorie({ category_name }); // Pass an object with category_name
        await newCategorie.save();
        res.status(201).json({ message: "Category created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}


