const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [String],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantitySold: { type: Number, default: 0 }, // Add quantitySold field
  averageRating: { type: Number, default: 0 }, // Add averageRating field
  totalReviews: { type: Number, default: 0 }, // Add totalReviews field
  totalRating: { type: Number, default: 0 }, // Add totalRating field
});

module.exports = mongoose.model('Product', productSchema);
