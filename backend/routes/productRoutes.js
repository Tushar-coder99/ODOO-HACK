const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get All Products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get Single Product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// ADMIN: Create Product
router.post('/', async (req, res) => {
  const { name, price, description, image, category } = req.body;
  
  const product = new Product({
    name, price, description, image, category
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// ADMIN: Delete Product
router.delete('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: req.params.id }); // Updated syntax
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
