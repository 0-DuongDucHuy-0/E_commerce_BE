const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Cho phép cookie
}));

app.use(bodyParser.json());
app.use(cookieParser());

// Routes
routers(app);

// Start server
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
