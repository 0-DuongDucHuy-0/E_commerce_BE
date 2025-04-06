const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.get("/get-all-products", ProductController.getAllProducts);
router.get("/get-all-product-by-category/:id", ProductController.getAllProductByCategory);
router.get("/get-detail-product/:id", ProductController.getDetailProduct);
router.post("/create-product", ProductController.createProduct);

module.exports = router;
