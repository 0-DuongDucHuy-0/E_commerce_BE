// INSERT INTO monthly_fees (student_id, month, ktx_fee, electricity_fee, water_fee)
// VALUES (123, '2024-11', 500000, 150000, 100000);

const express = require('express');
const feesController = require('../controllers/FeesController');
const router = express.Router();
const {
    authAdminMiddleWare,
    authUserMiddleWare,
    authStaffMiddleWare,
} = require("../middleware/auth");

// router.get("/get-detail-fees/:id", feesController.getDetailFees);
// router.get("/get-all-fees", feesController.getAllFees);
router.post("/create-fees/:id", authStaffMiddleWare, feesController.createFees);
// router.put("update-fees", feesController.updateFees);

module.exports = router;

