// Database configuration

const mongoose = require('mongoose');

// Connect to MongoDB
const ATLAS_URL = process.env.ATLAS_URL;

const connectDb = () => mongoose.connect(ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

module.exports = { connectDb }