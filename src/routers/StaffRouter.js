const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authAdminMiddleWare,
  authUserMiddleWare,
} = require("../middleware/auth");

// router.post("/create-staff/:id", userController.createStaff);
// router.put("/update-staff/:id", authUserMiddleWare, userController.updateStaff);
// router.get("/get-all-staff", authAdminMiddleWare, userController.getAllStaff);

module.exports = router;
