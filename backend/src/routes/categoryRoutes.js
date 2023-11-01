const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const { 
    createCategory,
    getAllCategories, 
    updateCategory, 
    getCategoryById, 
    deleteCategory,
    deleteAllCategories
} = require('../controllers/categoryController');

// Create a new category (restricted to admin users)
router.post('/create', authenticateUser, createCategory);
// Get all categories
router.get('/all', getAllCategories);
// Update a category (restricted to admin users)
router.put('/update/:id', authenticateUser, updateCategory);
// Get a single category by ID
router.get('/single/:id', getCategoryById);
// Delete a category by ID (restricted to admin users)
router.delete('/delete/:id', authenticateUser, deleteCategory);
// Delete all categories (restricted to admin users)
router.delete('/deleteAll', authenticateUser, deleteAllCategories);


module.exports = router;
