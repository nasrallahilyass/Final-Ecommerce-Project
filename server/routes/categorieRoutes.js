const express = require('express');
const router = express.Router();
const {createCategorie, getCategorie, getCategorieByName, DeleteCategory,}= require('../controllers/categorieController');
 // create category
 router.post('/categories',createCategorie);
 //list all categories
 router.get('/categories', getCategorie)
 //get category by name (byID)
 router.get('/categorie', getCategorieByName)
 //update category
 //delete category
 router.delete('/categorie/:id', DeleteCategory)


 module.exports=router;