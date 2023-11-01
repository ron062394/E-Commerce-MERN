const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProduct
} = require('../controllers/productController');

// Create a new product (restricted to logged-in sellers)
router.post('/create', authenticateUser, createProduct);

// List all products
router.get('/list', listProducts);

// Get a single product by ID
router.get('/get/:id', getProductById);

// Update a product by ID (restricted to the seller)
router.put('/update/:id', authenticateUser, updateProduct);

// Delete a product by ID (restricted to the seller)
router.delete('/delete/:id', authenticateUser, deleteProduct);

// Delete a product by ID (restricted to the seller)
router.get('/featured-product', getFeaturedProduct);

// Other product routes can be added here

module.exports = router;
