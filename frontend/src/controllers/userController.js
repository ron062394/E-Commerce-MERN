const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password securely before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const user = new User({ username, email, password: hashedPassword, role });

    await user.save();

    // Generate a JWT and send it as a response
    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(201).json({username: user.username, role: user.role, token });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed: User not found' });
    }

    // Compare the password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Include the user's role in the token payload
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
      return res.status(200).json({ username: user.username, role: user.role, token });
    } else {
      return res.status(401).json({ message: 'Authentication failed: Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Authentication failed', error: error.message });
  }
};



module.exports = { registerUser, loginUser };