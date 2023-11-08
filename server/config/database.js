// Database configuration

const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB_URI;

// Connect to the database
mongoose.connect(`${MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

// Export the Mongoose instance for use in your application
module.exports = mongoose;