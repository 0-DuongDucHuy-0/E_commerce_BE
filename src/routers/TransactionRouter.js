const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-transaction", TransactionController.createTransactions);

module.exports = router;
