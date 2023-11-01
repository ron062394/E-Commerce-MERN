// controllers/orderController.js

const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel'); // Import the cart model

// Place a new order
// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { shippingInfo } = req.body;
    const user = req.user; // Assuming user is authenticated

    // Retrieve the contents of the buyer's cart
    const cart = await Cart.findOne({ user: user._id }).populate({
      path: 'items.product',
      select: 'seller title price stock', // Include necessary fields, including 'stock'
    });

    if (!cart) {
      return res.status(400).json({ message: 'No items in the cart. Cannot place an empty order.' });
    }

    // Create a new order for each seller
    const orders = [];

    // Group items by seller
    const sellerOrders = {};

    for (const item of cart.items) {
      if (item.product && item.product.seller) {
        const sellerId = item.product.seller.toString();

        // Ensure seller data is available
        if (!sellerOrders[sellerId]) {
          const sellerUser = await User.findById(sellerId);

          if (!sellerUser) {
            return res.status(400).json({ message: 'Seller information not found.' });
          }

          sellerOrders[sellerId] = {
            buyer: {
              userId: user._id,
              username: user.username,
            },
            seller: {
              userId: sellerId,
              username: sellerUser.username,
            },
            products: [],
            shippingInfo: {
              name: shippingInfo.name,
              contactNumber: shippingInfo.contactNumber,
              address: shippingInfo.address,
              city: shippingInfo.city,
              postalCode: shippingInfo.postalCode,
            },
            orderTotal: 0,
            orderStatus: 'pending',
          };
        }

        const productPrice = item.product.price;
        const itemTotal = item.quantity * productPrice;

        // Find the product by ID
        const product = await Product.findById(item.product._id);

        if (product) {
          if (product.stock >= item.quantity) {
            product.stock -= item.quantity;
            product.quantitySold += item.quantity;
            await product.save(); // Save changes to the product

            sellerOrders[sellerId].products.push({
              productId: item.product._id,
              title: item.product.title,
              quantity: item.quantity,
              price: productPrice,
              itemTotal: itemTotal,
            });

            sellerOrders[sellerId].orderTotal += itemTotal;
          } else {
            const productName = item.product.title;
            return res.status(400).json({
              message: `Sorry, ${productName} is out of stock or you've ordered more than available.`,
            });
          }
        } else {
          console.error('Product not found for item in the cart.');
        }
      } else {
        console.error('Invalid item or seller information for an item in the cart.');
      }
    }

    for (const sellerId in sellerOrders) {
      if (sellerOrders.hasOwnProperty(sellerId)) {
        const orderData = sellerOrders[sellerId];
        const order = new Order(orderData);
        await order.save();
        orders.push(order);
      }
    }

    // Clear the buyer's cart or update its status
    const clearCart = await Cart.findOne({ user: user._id });
    if (clearCart) {
      clearCart.items = [];
      await clearCart.save();
    }

    res.status(201).json({ message: 'Order placed successfully', orders });
  } catch (error) {
    res.status(400).json({ message: 'Placing an order failed', error: error.message });
  }
};






// View order history for a user
const viewOrderHistory = async (req, res) => {
  try {
    const user = req.user;
    const orders = await Order.find({ 'buyer.userId': user._id }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history', error: error.message });
  }
};

// View seller orders
const viewSellerOrders = async (req, res) => {
  try {
    const seller = req.user;
    const orders = await Order.find({ 'seller.userId': seller._id }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seller order history', error: error.message });
  }
};



const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { newStatus } = req.body;

    // Check if the new status is one of the allowed enum values
    if (!['preparing to ship', 'shipped', 'product received'].includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid order status' });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the authenticated user is the seller or buyer
    if (req.user._id.toString() === order.seller.userId.toString() && ['preparing to ship', 'shipped'].includes(newStatus)) {
      // Seller can set status to 'preparing to ship' and 'shipped'
      order.orderStatus = newStatus;
    } else if (req.user._id.toString() === order.buyer.userId.toString() && newStatus === 'product received') {
      // Buyer can set status to 'product received'
      order.orderStatus = newStatus;
    } else {
      return res.status(403).json({ error: 'Unauthorized: User cannot change the status to this value' });
    }

    // Save the updated order without modifying the 'rated' flag
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// View a single order details
const getOrderDetailsById = async (req, res) => {
  const orderId = req.params.orderId; // Get the order ID from the URL parameter

  try {
    // Find the order by its ID and populate relevant data
    const order = await Order.findById(orderId)
      .populate('buyer.userId', 'username') // Populate buyer's username
      .populate('seller.userId', 'username') // Populate seller's username
      .populate('products.productId', 'title price quantity description'); // Populate product details

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error: error.message });
  }
};


module.exports = {
  placeOrder,
  viewOrderHistory,
  getOrderDetailsById,
  updateOrderStatus,
  viewSellerOrders
};