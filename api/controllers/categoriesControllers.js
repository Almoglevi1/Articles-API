const mongoose = require('mongoose');
const Category = require('../models/category');

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            // Find all categories
            const categories = await Category.find();

            // Check if the categories array is empty
            if (categories.length === 0) {
                return res.status(404).json({
                    message: 'No categories found'
                });
            }

            // If categories are found, return them
            res.status(200).json({
                categories
            });
        } catch (error) {
            // Handle any errors that occur in the promise chain
            res.status(500).json({
                error
            });
        }
    },
    createCategory: async (req, res) => {
        const { title, description } = req.body;

        // Validate the title
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({
                message: 'Invalid title, it should be a non-empty string'
            });
        }

        // Validate the description
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({
                message: 'Invalid description, it should be a non-empty string'
            });
        }

        // Create a new category instance
        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            title,
            description
        });

        try {
            // Save the category to the database
            await category.save();
            // Respond with success message after creating the category
            res.status(200).json({
                message: 'Created category'
            });
        } catch (error) {
            // Handle any errors that occur during the save operation
            res.status(500).json({
                error
            });
        }
    },
    getCategory: async (req, res) => {
        const categoryId = req.params.categoryId;

        // Validate the categoryId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                message: 'Invalid category ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        try {
            // Find the category by ID
            const category = await Category.findById(categoryId);

            if (!category) {
                // If the category is not found, return a 404 error
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            // If the category is found, return it
            res.status(200).json({
                category
            });
        } catch (error) {
            // Handle any errors that occur in the promise chain
            res.status(500).json({
                error
            });
        }
    },
    updateCategory: async (req, res) => {
        const categoryId = req.params.categoryId;

        // Validate the categoryId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                message: 'Invalid category ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        try {
            // Find the category by ID
            const category = await Category.findById(categoryId);

            if (!category) {
                // If the category is not found, return a 404 error
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            // If the category is found, update it
            await Category.updateOne({ _id: categoryId }, req.body);
            
            // Respond with success message after updating the category
            res.status(200).json({
                message: `Category updated`
            });
        } catch (error) {
            // Handle any errors that occur in the promise chain
            res.status(500).json({
                error
            });
        }
    },
    deleteCategory: async (req, res) => {
        const categoryId = req.params.categoryId;

        // Validate the categoryId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                message: 'Invalid category ID, a valid ID should contain 24-characters hexadecimal string'
            });
        }

        try {
            // Find the category by ID
            const category = await Category.findById(categoryId);

            if (!category) {
                // If the category is not found, return a 404 error
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            // If the category is found, delete it
            await Category.deleteOne({ _id: categoryId });
            
            // Respond with success message after deleting the category
            res.status(200).json({
                message: `Category _id:${categoryId} Deleted`
            });
        } catch (error) {
            // Handle any errors that occur in the promise chain
            res.status(500).json({
                error
            });
        }
    }
}