const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Add a product to the cart (restricted to logged-in buyers)
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
  
    try {
      // Check if the user is a buyer
      if (req.user.role !== 'buyer') {
        return res.status(403).json({ message: 'Unauthorized: Only buyers can add items to the cart' });
      }
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Calculate the price based on the current product price
      const price = product.price;
  
      // Check if the user already has a cart; if not, create one
      let cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }
  
      // Check if the product is already in the cart; if so, update the quantity
      const cartItem = cart.items.find((item) => item.product.toString() === productId);
      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price });
      }
  
      await cart.save();
      res.json({ message: 'Product added to the cart successfully', cart });
    } catch (error) {
      res.status(400).json({ message: 'Adding to the cart failed', error: error.message });
    }
  };

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  const productId = req.params.id;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item that matches the productId
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    await cart.save();
    res.json({ message: 'Product removed from the cart successfully', cart });
  } catch (error) {
    res.status(400).json({ message: 'Removing from the cart failed', error: error.message });
  }
};


// View the contents of the cart
const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Increment the quantity of a product in the cart
const incrementQuantity = async (req, res) => {
  const productId = req.params.productId; // The product ID to be incremented
  const userId = req.user._id; // User ID

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the cart item that matches the product ID
    const cartItem = cart.items.find((item) => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    // Increment the quantity
    cartItem.quantity++;

    // Save the updated cart
    await cart.save();

    res.json({ message: 'Product quantity incremented successfully', cart });
  } catch (error) {
    res.status(400).json({ message: 'Incrementing quantity failed', error: error.message });
  }
};

// Decrement the quantity of a product in the cart
const decrementQuantity = async (req, res) => {
  const productId = req.params.productId; // The product ID to be decremented
  const userId = req.user._id; // User ID

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the cart item that matches the product ID
    const cartItem = cart.items.find((item) => item.product.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in the cart' });
    }

    // Decrement the quantity if it's greater than 1, otherwise remove the product
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      // Remove the product from the cart
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    }

    // Save the updated cart
    await cart.save();

    res.json({ message: 'Product quantity decremented successfully', cart });
  } catch (error) {
    res.status(400).json({ message: 'Decrementing quantity failed', error: error.message });
  }
};

module.exports = { 
  addToCart,
  removeFromCart,
  viewCart,
  decrementQuantity,
  incrementQuantity
};
