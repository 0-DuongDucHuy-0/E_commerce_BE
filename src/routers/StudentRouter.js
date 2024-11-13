const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");
const {
  authAdminMiddleWare,
  authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-student/:id", authUserMiddleWare, studentController.createStudent);
router.put("/update-student/:id", studentController.updateStudent);
// router.get("/get-detail-student/:id", authUserMiddleWare, studentController.getDetailStudent);
// router.get("/get-all-student", authAdminMiddleWare, studentController.getAllStudent);

module.exports = router;
