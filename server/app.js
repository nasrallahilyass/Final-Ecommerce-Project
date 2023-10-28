// Main application file
require('./config/database')
const express = require("express");
const cors = require("cors");

require('dotenv').config();
const port = process.env.PORT || 5000; // Use the defined PORT or default to 5000

const UserRouter = require("./routes/userRoutes")


const app = express();


const bodyParser = require('express').json;
app.use(bodyParser())

app.use('/v1',UserRouter)

app.use(cors());
app.use(express.json());



app.listen(port, (err, res) => {
  console.log(`server is Running : http://localhost:${port}`);
});