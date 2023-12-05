// Main application file
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const subcategorieRoutes = require('./routes/subcategorieRoutes');
const { connectDb } = require('./config/database');
const UserRouter = require("./routes/userRoutes")
const bodyParser = require('express').json;
const express = require("express");
const cors = require("cors");
const cookie = require('cookie-parser')
const port = process.env.PORT || 5000; 


const app = express();



// Midll
app.use(bodyParser())
app.use(cookie())
app.use('/v1',UserRouter)

app.use(cors());
app.use(express.json());



app.use(express.static('public'));


//products/categorie
app.use('/v1', productRoutes);
app.use('/v1', categorieRoutes);
app.use('/v1', subcategorieRoutes);



connectDb();
app.listen(port, (err, res) => {
  console.log(`server is Running : http://localhost:${port}`);
});