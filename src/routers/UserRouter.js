const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { authAdminMiddleWare } = require("../middleware/auth");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.get("/get-all-user", authAdminMiddleWare, userController.getAllUser);

module.exports = router;
