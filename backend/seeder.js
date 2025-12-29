const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Sample Data
const products = [
  {
    name: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Experience premium sound quality with active noise cancellation."
  },
  {
    name: "Smart Fitness Watch Series 7",
    category: "Wearables",
    price: 199.50,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Track your health metrics, workouts, and sleep patterns."
  },
 {
    name: "Ergonomic Mechanical Keyboard",
    category: "Accessories",
    price: 120.00,
    // NEW WORKING URL 👇
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80",
    description: "Typing perfection with RGB backlighting."
  },
  {
    name: "Designer Denim Jacket",
    category: "Fashion",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80",
    description: "Classic vintage style denim jacket."
  }
];

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
