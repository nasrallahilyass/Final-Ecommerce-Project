// Main application file
require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT ||3000;
const UserRouter = require("./routes/userRoutes");
const customerRoutes = require('./routes/customerRoutes.js');
const cookieParser = require('cookie-parser');

const app = express();


require('./config/database')
app.use(cookieParser());


// app.use(bodyParser.json())

app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
// app.use(paginate.middleware(10, 50));

app.use('/v1',UserRouter);
app.use('/customers',customerRoutes);

app.listen(PORT, function check(error){
  if(error)
  console.log('error!!');
else
console.log(`server is running on port ${PORT}`)
});