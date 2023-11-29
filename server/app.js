// Main application file
require('dotenv').config();
require('./config/database')
const UserRouter = require("./routes/userRoutes")
const bodyParser = require('express').json;
const customerRoutes = require("./routes/customerRoutes.js");
const session = require("express-session");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000; 


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Midll
app.use(bodyParser())
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // optionsSuccessStatus: 204,
  })
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);app.use(express.json());

app.use('/v1',UserRouter)
app.use("/customers", customerRoutes);




app.listen(port, (err, res) => {
  console.log(`server is Running on port ${port}`);
});