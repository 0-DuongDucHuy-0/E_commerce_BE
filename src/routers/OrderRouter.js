const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-order/:id", OrderController.createOrder);

module.exports = router;
