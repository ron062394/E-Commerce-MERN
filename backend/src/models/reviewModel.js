const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Reference to the order
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  // You can include any other fields you need for reviews, such as a timestamp.
});

module.exports = mongoose.model('Review', reviewSchema);
