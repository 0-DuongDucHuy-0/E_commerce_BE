const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-product", ProductController.createProduct);

module.exports = router;
