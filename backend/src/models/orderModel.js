const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
  },
  seller: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      rated: { type: Boolean, default: false },
    },
  ],
  shippingInfo: {
    name: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  orderTotal: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['pending', 'preparing to ship', 'shipped', 'product received'],
    required: true,
  },
});

module.exports = mongoose.model('Order', orderSchema);
