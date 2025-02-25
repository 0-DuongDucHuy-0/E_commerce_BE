const ChatBotConversationServices = require("../services/ChatBotConversationServices");

const createChat = async (req, res) => {
    try {
        const { user_id, sender, message } = req.body;

        if (!user_id || !sender || !message) {
            return res.status(200).json({
                status: "ERR",
                message: "Thiếu thông tin đoạn chat",
            });
        }
        const result = await ChatBotConversationServices.createChat(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAll = async (req, res) => {
    try {
        const result = await ChatBotConversationServices.getAll();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllByUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        if (!user_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có user id",
            });
        }
        const result = await ChatBotConversationServices.getAllByUser(user_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    createChat,
    getAll,
    getAllByUser
}