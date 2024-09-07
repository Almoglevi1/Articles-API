const express = require('express');
const router = express.Router();

// Import controller functions for handling category-related requests
const {
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoriesControllers')

// Route to get all categories
router.get('/', getAllCategories);

// Route to create a new category
router.post('/', createCategory);

// Route to get a specific category by its ID
router.get('/:categoryId', getCategory);

// Route to update an existing category by its ID
router.patch('/:categoryId', updateCategory);

// Route to delete a category by its ID
router.delete('/:categoryId', deleteCategory);

module.exports = router;