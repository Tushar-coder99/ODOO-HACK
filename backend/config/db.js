const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connects to local MongoDB. 
    // If using Atlas, replace the string with your connection URI.
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopmate');
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
