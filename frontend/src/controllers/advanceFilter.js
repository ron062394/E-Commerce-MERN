const Order = require('../models/orderModel');

const getProductsToReview = async (req, res) => {
  try {
    // Find orders where the user is the buyer and order status is 'product received'
    const orders = await Order.find({
      'buyer.userId': req.user._id,
      orderStatus: 'product received',
    });

    const productsToReview = [];
    for (const order of orders) {
      for (const product of order.products) {
        if (!product.rated) {
          productsToReview.push(product);
        }
      }
    }

    res.json(productsToReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getProductsToReview };
