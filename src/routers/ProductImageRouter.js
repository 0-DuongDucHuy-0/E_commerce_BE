const express = require("express");
const router = express.Router();
const ProductImageController = require("../controllers/ProductImageController");

router.get("/get-all-img-by-id/:id", ProductImageController.getAllImagesById)
router.post("/upload-img", ProductImageController.uploadImage);

module.exports = router;
