const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

routers(app);

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
