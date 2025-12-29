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

app.use(cors()); // Allow Frontend to send requests
app.use(express.json()); // Allow JSON data in requests
app.use('/api/users', userRoutes); // Add this line
app.use('/api/orders', orderRoutes);

// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
