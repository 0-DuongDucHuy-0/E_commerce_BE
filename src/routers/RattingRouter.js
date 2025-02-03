const express = require("express");
const router = express.Router();
const RattingController = require("../controllers/RattingController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-rating", RattingController.createRatting);
router.post("/update-rating", RattingController.updateRatting);
router.get("/get-rating-by-product/:id", RattingController.getRatingByProduct);

module.exports = router;
