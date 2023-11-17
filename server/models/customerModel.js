// models/customerModel.js
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  
  first_name: {
    type: String,
    required: true
}, 
  last_name:  {
    type: String,
    required: true
},
  email:{
    type: String,
    required: true,
    unique:true,
  }, 
  password:{
    type: String,
    required: true 
  }, 
  creation_date: {
     type: Date, 
     default: Date.now
     }, 
  valid_account: { 
    type: Boolean, 
    default: false }, 
  active: {
     type: Boolean,
      //default:true
     }, 
  role:{
    type:String,
    default:'customer'
  },
});


module.exports = mongoose.model('Customer', CustomerSchema);
