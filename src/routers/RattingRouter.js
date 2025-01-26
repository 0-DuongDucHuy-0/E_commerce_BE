const express = require("express");
const router = express.Router();
const RattingController = require("../controllers/RattingController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-ratting", RattingController.createRatting);
router.post("/update-ratting", RattingController.updateRatting);

module.exports = router;
