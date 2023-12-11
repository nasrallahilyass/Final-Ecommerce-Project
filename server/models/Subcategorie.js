const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCategorieSchema = new Schema({
  subcategory_name: {
    type: String,
    required: true,
  },
  categorie_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true, // Ensure the category ID is required
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Create a compound unique index on 'subcategory_name' and 'categorie_id'
SubCategorieSchema.index({ subcategory_name: 1, categorie_id: 1 }, { unique: true });

const SubCategorie = mongoose.model('SubCategorie', SubCategorieSchema);
module.exports = SubCategorie;