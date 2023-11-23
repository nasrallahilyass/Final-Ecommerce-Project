// Main application file
require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const UserRouter = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();
require("./config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(bodyParser.json())
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // optionsSuccessStatus: 204,
  })
); // Fixed the cors middleware initialization
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
// app.use(paginate.middleware(10, 50));

// Middlewares
// const corsOptions = {
//   origin: "http://127.0.0.1:5173",
//   // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   // optionsSuccessStatus: 204,
// };


app.use("/v1", UserRouter);
app.use("/customers", customerRoutes);

app.listen(PORT, function check(error) {
  if (error) console.log("error!!");
  else console.log(`server is running on port ${PORT}`);
});
