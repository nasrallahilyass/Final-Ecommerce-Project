require('./config/database')
const express = require('express');
const app = express();

const port = process.env.PORT || 5000; // Use the defined PORT or default to 5000



app.use(express.json())
const orderRoutes = require('./routes/orderRoutes');

app.use('/v1', orderRoutes);

app.listen(port, (err, res) => {
    console.log(`server is Running : http://localhost:${port}`);
  });