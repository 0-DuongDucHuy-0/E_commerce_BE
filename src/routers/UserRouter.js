const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.get("/get-all-user", userController.getAllUser);

module.exports = router;
