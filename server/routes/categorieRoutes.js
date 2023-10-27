const express = require('express');
const router = express.Router();
const {createCategorie,}= require('../controllers/categorieController');
 // create category
 router.post('/categories', createCategorie);
 module.exports=router;