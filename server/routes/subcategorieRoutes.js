const express = require('express');
const router = express.Router();
const subCategorieController = require('../controllers/subcategorieController');

router.get('/subcategorie', subCategorieController.GetAllSubcategories)

router.post('/subcategorie', subCategorieController.CreateSubcategory)
router.get('/subcategorie/:id', subCategorieController.GetAllSubcategoriByID )    
router.get('/subcategories', subCategorieController.searchSubcategories)

router.put('/subcategorie/:id', subCategorieController.updateSubcategory)
router.delete('/subcategories/:id', subCategorieController.Deletesub)
module.exports = router;