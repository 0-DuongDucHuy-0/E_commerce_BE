const express = require('express');
const staffController = require('../controllers/StaffController');
const router = express.Router();

// POST route để duyệt yêu cầu vào ký túc xá sinh viên
router.post("/approve-dorm-request/:id", staffController.approveDormRequest);

module.exports = router;
