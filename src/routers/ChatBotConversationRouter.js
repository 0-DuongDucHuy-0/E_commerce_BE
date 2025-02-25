const express = require("express");
const router = express.Router();
const ChatBotConversationController = require("../controllers/ChatBotConversationController");
const {
    authAdminMiddleWare,
    authUserMiddleWare,
} = require("../middleware/auth");

router.get("/get-all", ChatBotConversationController.getAll);
router.get("/get-all-by-user/:id", ChatBotConversationController.getAllByUser);
router.post("/create-chat", ChatBotConversationController.createChat);

module.exports = router;
