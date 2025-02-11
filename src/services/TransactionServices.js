const pool = require("../models/db");

const createTransactions = async (data) => {
    const { order_id, product_id, price, quantity, name, avatar } = data;

    return new Promise((resolve, reject) => {
        const query = `INSERT INTO transactions (order_id, product_id, price, quantity, name, avatar) 
                        VALUES (?,?,?,?,?,?)`;

        pool.query(query, [order_id, product_id, price, quantity, name, avatar], (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Tạo đơn hàng không thành công trans",
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

const getAllTransactionsByUser = async (user_id, product_id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT transactions.*, orders.user_id FROM transactions LEFT JOIN orders ON orders.id = transactions.order_id WHERE user_id =? AND product_id =?`;
        pool.query(query, [user_id, product_id], (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy đơn hàng của người dùng không thành công",
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



module.exports = {
    createTransactions,
    getAllTransactionsByUser
};