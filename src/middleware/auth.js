const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authAdminMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "The authentication: Admin Middle Ware",
        status: "ERROR",
      });
    }
    console.log("user", user);
    if (user?.role === "admin") {
      console.log("authADminMiddleWare working");
      next();
    } else {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  console.log(token, userId);
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    console.log("user", user);
    if (err) {
      console.log("err", err);
      return res.status(404).json({
        message: "The authentication: User Middle Ware",
        status: "ERROR",
      });
    }
    if (user?.role === "admin" || user?.id.toString() === userId.toString()) {
      console.log("authUserMiddleWare working");
      next();
    } else {
      return res.status(404).json({
        message: "The authentication",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authAdminMiddleWare,
  authUserMiddleWare,
};
