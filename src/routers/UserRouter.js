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
router.delete(
  "/delete-user/:id",
  userController.deleteUser
);
router.get("/get-all-user", userController.getAllUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
