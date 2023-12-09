const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const categorieController= require('../controllers/categorieController');
const authMiddleware = require('../middleware/authMiddleware');
 // create category
 router.post('/categories',authMiddleware, categorieController.createCategorie);
 //list all categories
 router.get('/categories', categorieController.getCategorie)
 //get category byID
 router.get('/categorie/:id', categorieController.getCategorieByID)
 router.get('/categorie', categorieController.searchCategory)
 //update category
router.put('/categorie/:id', authMiddleware,categorieController.updateCategorie)
 //delete category
 router.delete('/categorie/:id',authMiddleware,categorieController.DeleteCategory)

 module.exports=router;