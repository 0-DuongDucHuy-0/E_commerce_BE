const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");
const {
  authAdminMiddleWare,
  authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-student/:id", authUserMiddleWare, studentController.createStudent);
// router.put("/update-student/:id", authUserMiddleWare, userController.updateStudent);
// router.get("/get-detail-student/:id", authUserMiddleWare, userController.getDetailStudent);
// router.get("/get-all-student", authAdminMiddleWare, userController.getAllStudent);

module.exports = router;
