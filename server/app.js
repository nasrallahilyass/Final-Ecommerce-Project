// Main application file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const { connectDb } = require('./config/database');
const port = process.env.PORT || 5000; // Use the defined PORT or default to 5000

const app = express();

app.use(express.static('public'));

app.use(cors());
app.use(express.json());


app.use('/v1', productRoutes);
app.use('/v1', categorieRoutes);



connectDb();

app.listen(port, (err, res) => {
  console.log(`server is Running : http://localhost:${port}`);
});




