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
router.put("/update-user/:id", authUserMiddleWare, userController.updateUser);
router.delete(
  "/delete-user/:id",
  authUserMiddleWare,
  userController.deleteUser
);
router.get("/get-all-user", authAdminMiddleWare, userController.getAllUser);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
