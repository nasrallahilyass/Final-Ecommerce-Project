const express = require('express');
const router = express.Router();
const subCategorieController = require('../controllers/subcategorieController');

router.get('/subcategorie', subCategorieController.GetAllSubcategories)

router.post('/subcategorie', subCategorieController.CreateSubcategory)

module.exports = router;