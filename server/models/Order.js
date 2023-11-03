const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        //required: true,
    },
    order_items: {
        type: [mongoose.Schema.Types.Mixed], // You can use Array or Mixed for dynamic structure
    },
    order_date: {
        type: Number,
        //required: true
    },
    cart_total_price: {
        type: Number, // Use Decimal/Double as a Number type
       // required: true,
    },
    status: {
        type: String,
       // required: true,
    },
});



module.exports = mongoose.model('Order', orderSchema); 
