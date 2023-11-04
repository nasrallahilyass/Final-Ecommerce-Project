// subcategory schema
const mongoose= require('mongoose');
const { Schema } = mongoose;

const SubCategorieSchema= new Schema({
    subcategory_name : {
        type : String,
        required : true,
        unique :true
    },
    categorie_id: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    },
    active :{
        type:Boolean,
        required :true,
        default : false,
    }
})
const SubCategorie = mongoose.model('SubCategorie',SubCategorieSchema);
module.exports =SubCategorie;