// CREATE TABLE student_requests (
//     request_id INT AUTO_INCREMENT PRIMARY KEY, -- Khóa chính tự tăng
//     student_id INT NOT NULL,                   -- ID của sinh viên (liên kết tới bảng sinh viên)
//     staff_id INT,                              -- ID của nhân viên xử lý (liên kết tới bảng nhân viên, có thể NULL nếu chưa xử lý)
//     request_type ENUM('Đổi phòng', 'Ra khỏi ký túc xá', 'Khác') NOT NULL, -- Loại yêu cầu
//     description TEXT,                          -- Mô tả chi tiết yêu cầu
//     status ENUM('Chờ xử lý', 'Đã xử lý', 'Từ chối') DEFAULT 'Chờ xử lý', -- Trạng thái yêu cầu
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Thời điểm tạo yêu cầu
// );

const express = require('express');
const studentRequestsController = require('../controllers/StudentRequestsController');
const router = express.Router();
const {
    authAdminMiddleWare,
    authUserMiddleWare,
    authStaffMiddleWare,
} = require("../middleware/auth");

router.post("/create-request/:id", studentRequestsController.createRequest);
router.put("/update-request-by-student/:id", studentRequestsController.updateRequestByStudent); //sinh viên trỉnh sửa
// router.put("/update-request-by-staff/:id");  phê duyệt bởi quản lý
// router.get("/get-all-requests/");
// router.get("/get-detail-request/:id");

module.exports = router;




