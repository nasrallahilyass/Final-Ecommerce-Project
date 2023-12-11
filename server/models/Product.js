// Product schema and model
const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    sku:{ 
        type : String,
        unique: true
    },
    product_image:{
        type: String,
        required:true
    },
    Product_name:{
        type : String,
        required: true,
    },
    subcategory_id:{
        type: Schema.Types.ObjectId,
        ref: 'SubCategorie',
        required:true
    },
    short_description :{
       type: String,
       required: true,
    },
    long_description :{
        type : String,
    },
    price :{
        type : Number,
        require : true,
    },
    discount_price :{
        type : Number 
    },
    options:{
        type : Array,    
    },
    active :{
        type: Boolean,
        default: false
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    }
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;