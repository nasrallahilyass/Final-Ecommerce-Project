const mongoose = require('mongoose');
require('dotenv').config();

// Database connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, // Use the new option for createIndexes
};

// Connect to the database
mongoose.connect(process.env.DATA_BASE_URL, options)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Export the Mongoose instance for use in your application
module.exports = mongoose;