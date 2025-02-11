const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.get("/get-all-category", CategoryController.getAllCategory);

module.exports = router;