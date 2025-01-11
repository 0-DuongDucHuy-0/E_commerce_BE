const express = require("express");
const router = express.Router();
const multer = require('multer');
const uploadImgController = require("../controllers/UpLoadImgController");
const upload = multer({
    dest: 'upload/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}); // Tạm lưu file trong thư mục

router.post("/upload-img", upload.single('image'), uploadImgController.uploadImg);

module.exports = router;