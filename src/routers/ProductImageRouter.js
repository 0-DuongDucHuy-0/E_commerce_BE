const express = require("express");
const router = express.Router();
const UpLoadImgController = require("../controllers/UpLoadImgController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/upload-img", UpLoadImgController.uploadImage);

module.exports = router;
