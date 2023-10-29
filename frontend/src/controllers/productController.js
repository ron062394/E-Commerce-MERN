const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const createProduct = async (req, res) => {
  const { title, description, price, images, categoryId, tags, stock } = req.body;

  // Check if the user is a seller
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Unauthorized: Only sellers can create products' });
  }

  try {
    // Check if the category exists and is valid
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category reference' });
    }

    const product = new Product({
      title,
      description,
      price,
      images,
      category: category._id,
      seller: req.user._id,
      tags,
      stock,
      quantitySold: 0, // Add default value for quantitySold
      averageRating: 0, // Add default value for averageRating
      totalReviews: 0, // Add default value for totalReviews
      totalRating: 0, // Add default value for totalRating
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Product creation failed', error: error.message });
  }
};


// List all products
const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { title, description, price, images, categoryId, tags, stock, quantitySold, averageRating } = req.body; // Include stock in the request body

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user is the seller of the product
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You can only update your own products' });
    }

    // Check if the category exists and is valid
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Invalid category reference' });
    }

    // Update the product fields, including stock
    product.title = title;
    product.description = description;
    product.price = price;
    product.images = images;
    product.category = category._id;
    product.tags = tags;
    product.quantitySold = quantitySold; // Update the stock field
    product.averageRating = averageRating; // Update the stock field

    await product.save();

    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Product update failed', error: error.message });
  }
};


// Delete a product by ID
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user is the seller of the product
    if (product.seller.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized: You can only delete your own products' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Fetch a random featured product
const getFeaturedProduct = async (req, res) => {
  try {
    // Query your MongoDB database to get a random product
    const randomProduct = await Product.aggregate([{ $sample: { size: 1 } }]);

    if (!randomProduct || randomProduct.length === 0) {
      return res.status(404).json({ message: 'Featured product not found' });
    }

    res.status(200).json(randomProduct[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};






module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProduct
};
