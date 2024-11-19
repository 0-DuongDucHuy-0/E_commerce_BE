const express = require('express');
const feesController = require('../controllers/FeesController');
const router = express.Router();
const {
    authAdminMiddleWare,
    authUserMiddleWare,
    authStaffMiddleWare,
} = require("../middleware/auth");

// router.get("/get-detail-fees/:id", feesController.getDetailFees);
router.get("/get-all-fees", feesController.getAllFees);
router.post("/create-fees/:id", authStaffMiddleWare, feesController.createFees);
router.put("/update-fees/:id", authStaffMiddleWare, feesController.updateFees);

module.exports = router;

