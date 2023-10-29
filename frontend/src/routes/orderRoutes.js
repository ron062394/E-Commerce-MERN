// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');

const {
    placeOrder,
    viewOrderHistory,
    getOrderDetailsById,
    updateOrderStatus,
    viewSellerOrders
} = require('../controllers/orderController');

const {getProductsToReview} = require('../controllers/advanceFilter')

// Place a new order
router.post('/place', authenticateUser, placeOrder);

// View order history
router.get('/history', authenticateUser, viewOrderHistory);

// View order details
router.get('/:orderId', authenticateUser, getOrderDetailsById);

// Update Order Status
router.put('/:orderId', authenticateUser, updateOrderStatus);

// Seller-specific route
router.get('/seller/orders', authenticateUser, viewSellerOrders);

router.get('/products-to-review', authenticateUser, getProductsToReview);

module.exports = router;
