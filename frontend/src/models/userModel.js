const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['buyer', 'seller'], required: true },
  profilePicture: String,
  contactInfo: {
    address: String,
    phone: String,
  },
});

module.exports = mongoose.model('User', userSchema);
