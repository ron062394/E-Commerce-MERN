const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization'); // Assuming the token is sent in the Authorization header
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    const decoded = jwt.verify(token.substring(7), process.env.JWT_SECRET); // Use a strong, secure secret key
  
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed: User not found' });
    }

    req.user = user;

    if (user.role === 'admin') {
      req.isAdmin = true; // Set a flag to indicate admin status
    } else {
      req.isAdmin = false; // Set a flag to indicate non-admin status
    }

    next();
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });

  }
};

module.exports = { authenticateUser };

