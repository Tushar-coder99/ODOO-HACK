const User = require('../models/User');

const protect = async (req, res, next) => {
  // Simple check for now since we are storing user info in frontend
  // In a real production app, you would verify JWT token here.
  next(); 
};

module.exports = { protect };
