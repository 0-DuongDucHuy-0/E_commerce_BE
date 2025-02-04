const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authAdminMiddleWare,
  authUserMiddleWare,
} = require("../middleware/auth");

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/sign-out", userController.signOut);
router.put("/update-user/:id", userController.updateUser);
router.put("/change-password/:id", userController.changePassword);
router.get("/get-all-user", userController.getAllUser);
router.get("/get-detail-user/:id", userController.getDetailUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
