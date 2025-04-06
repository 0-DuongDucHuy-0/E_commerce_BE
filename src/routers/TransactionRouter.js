const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-transaction", TransactionController.createTransactions);
router.post("/get-all-transactions-by-user", TransactionController.getAllTransactionsByUser);
router.get("/get-all-product-by-order/:id", TransactionController.getAllProductByOrder);

module.exports = router;
