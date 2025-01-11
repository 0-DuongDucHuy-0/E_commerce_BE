const express = require("express");
const router = express.Router();
const ProductImageController = require("../controllers/ProductImageController");

router.post("/upload-img", ProductImageController.uploadImage);

module.exports = router;
