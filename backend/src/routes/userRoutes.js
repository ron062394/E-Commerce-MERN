const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Register a new user (buyer or seller)
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

module.exports = router;
