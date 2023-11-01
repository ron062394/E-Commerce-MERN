const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

const updateProductRating = async (productId, rating) => {
  const product = await Product.findById(productId);
  product.totalReviews += 1;
  product.totalRating += rating;
  product.averageRating = product.totalRating / product.totalReviews;
  await product.save();
};

const markProductAsRated = async (orderId, productId) => {
  const order = await Order.findById(orderId);
  const productInfo = order.products.find((productInfo) => productInfo.productId.toString() === productId);

  if (!productInfo) {
    throw new Error('Product not found in the order');
  }

  productInfo.rated = true;
  await order.save();
};

const createReview = async (req, res) => {
  try {
    const { order_id, product_id, rating, review } = req.body;

    // Retrieve the user from the token
    const user = req.user;

    // Find the order first
    const userOrder = await Order.findById(order_id);

    if (!userOrder) {
      return res.status(400).json({ message: 'Order not found' });
    }

    // Verify that the user in the token matches the user associated with the order
    if (userOrder.buyer.userId.toString() !== user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to review this order' });
    }

    // Check the order status
    if (userOrder.orderStatus !== 'product received') {
      return res.status(400).json({ message: 'Order status is not "product received"' });
    }

    // Check if the user has already rated the product in this specific order
    const productInfo = userOrder.products.find((productInfo) => productInfo.productId.toString() === product_id);
    if (productInfo.rated) {
      return res.status(400).json({ message: 'You have already rated this product in this order' });
    }

    // Create a new review
    const newReview = new Review({ user: user._id, order: order_id, product: product_id, rating, review });
    await newReview.save();

    // Update product rating and mark it as rated
    await updateProductRating(product_id, rating);
    await markProductAsRated(order_id, product_id);

    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(400).json({ message: 'Error creating review', error: error.message });
  }
};

module.exports = { createReview };


module.exports = { createReview };
