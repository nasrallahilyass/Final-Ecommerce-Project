const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;

// Connect to the database
// Connect to MongoDB
//const ATLAS_URL = process.env.ATLAS_URL;

const connectDb = () => mongoose.connect(mongoURI, {
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
module.exports = { connectDb }