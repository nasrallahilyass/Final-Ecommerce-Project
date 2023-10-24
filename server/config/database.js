// Database configuration

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017'

, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error('MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});