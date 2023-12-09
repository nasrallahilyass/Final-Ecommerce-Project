//categories model

const mongoose= require('mongoose');
const CategorieSchema= new mongoose.Schema({
    category_name : {
        type : String,
        required : true,
        unique :true
    },
    active :{
        type:Boolean,
        default: false
    }

})
const Categorie = mongoose.model('Categorie',CategorieSchema);
module.exports = Categorie;