const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authAdminMiddleWare = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token không được cung cấp",
      status: "ERROR",
    });
  }

  const token = authHeader.split(" ")[1];
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
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token không được cung cấp",
      status: "ERROR",
    });
  }

  const token = authHeader.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({
        message: "The authentication: User Middle Ware",
        status: "ERROR",
      });
    }
    if (user?.role === "admin" || user?.role === "staff" || user?.id.toString() === userId.toString()) {
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

const authStaffMiddleWare = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token không được cung cấp",
      status: "ERROR",
    });
  }

  const token = authHeader.split(" ")[1];
  const staff_id = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({
        message: "The authentication: Staff Middle Ware",
        status: "ERROR",
      });
    }
    if (user?.role === "admin" || user?.id.toString() === staff_id.toString()) {
      console.log("authStaffMiddleWare working");
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
  authStaffMiddleWare,
};
