const pool = require("../models/db");

const createChat = (data) => {
    const { user_id, sender, message } = data;
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO chatbot_conversations (user_id, sender, message) VALUES (?,?,?)`;
        pool.query(query, [user_id, sender, message], (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Tạo tin nhắn không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: result,
            });
        });
    });
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM chatbot_conversations";
        pool.query(query, (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy dữ liệu chatbot_conversations không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: result,
            });
        });
    });
}

const getAllByUser = (user_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM chatbot_conversations WHERE user_id =?";
        pool.query(query, [user_id], (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy dữ liệu chatbot_conversations theo user_id không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: result,
            });
        });
    });
}

module.exports = {
    createChat,
    getAll,
    getAllByUser
};
