const express = require('express');
const staffController = require('../controllers/StaffController');
const router = express.Router();
const {
    authAdminMiddleWare,
    authUserMiddleWare,
    authStaffMiddleWare,
} = require("../middleware/auth");

router.get("/get-detail-staff/:id", authStaffMiddleWare, staffController.getDetailStaff);
router.get("/get-all-staff", authStaffMiddleWare, staffController.getAllStaff);
router.put("/update-staff/:id", authStaffMiddleWare, staffController.updateStaff);
// POST route để duyệt yêu cầu vào ký túc xá sinh viên
router.post("/approve-dorm-request/:id", authStaffMiddleWare, staffController.approveDormRequest); // lỗi khi gọi api nhiều lần số người trong phòng tăng

module.exports = router;
