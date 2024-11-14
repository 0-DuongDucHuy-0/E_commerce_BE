const express = require("express");
const router = express.Router();
// const staffController = require("../controllers/StaffController");
const {
  authAdminMiddleWare,
  authUserMiddleWare,
} = require("../middleware/auth");

// router.post("/create-staff/:id", staffController.createStaff);
// router.put("/update-staff/:id", authUserMiddleWare, staffController.updateStaff);
// router.get("/get-all-staff", authAdminMiddleWare, staffController.getAllStaff);

module.exports = router;
