const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
connectDB(); // Connect to Database

const app = express();

// CORS Configuration - Allow Frontend Access
app.use(cors({
  origin: [
    "http://localhost:5173",                 // Local Development
    "https://odoo-hack-ecomm.netlify.app"    // YOUR NETLIFY APP (Live)
  ],
  credentials: true
}));

app.use(express.json()); // Allow JSON data in requests

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
