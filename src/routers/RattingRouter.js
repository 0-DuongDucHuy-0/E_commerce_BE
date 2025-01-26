const express = require("express");
const router = express.Router();
const RattingController = require("../controllers/RattingController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.post("/create-ratting", RattingController.createRatting);

module.exports = router;
