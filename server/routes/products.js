import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, state, page = 1, limit = 12 } = req.query;
    const query = { inStock: true };
    
    if (category) query.category = category;
    if (state) query.state = state;

    const products = await Product.find(query)
      .populate('seller', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (sellers only)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    // Check if user is a seller
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Only sellers can add products' });
    }

    // Validate required fields
    const { name, description, price, category, state } = req.body;
    if (!name || !description || !price || !category || !state) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const product = new Product({
      ...req.body,
      seller: req.userId,
      images: images
    });
    await product.save();
    
    const populatedProduct = await Product.findById(product._id)
      .populate('seller', 'name avatar');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get seller's products
router.get('/seller', auth, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.userId })
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;