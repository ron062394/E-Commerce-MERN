const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');

const { createReview } = require('../controllers/reviewController');

// Create a new review
router.post('/create', authenticateUser, createReview);

module.exports = router;
