const pool = require("../models/db");

const createOrder = (user_id, data) => {
    const {
        price,
        total_quantity,
        order_status_payment = 0, // Default to 0 if not provided
        order_status_transport = 0, // Default to 0 if not provided
        note,
        address,
        payment_method,
    } = data;

    console.log("Creating", price,
        total_quantity,
        order_status_payment, // Default to 0 if not provided
        order_status_transport, // Default to 0 if not provided
        note,
        address,
        payment_method,);

    return new Promise(async (resolve, reject) => {
        const query = `
        INSERT INTO orders 
        (user_id, price, total_quantity, order_status_payment, order_status_transport, note, address, payment_method) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
        await pool.query(
            query,
            [
                user_id,
                price,
                total_quantity,
                order_status_payment,
                order_status_transport,
                note,
                address,
                payment_method,
            ],
            (err, result) => {
                if (err) {
                    return reject({
                        status: "ERROR",
                        message: "Tạo đơn hàng không thành công order",
                        error: err,
                    });
                }
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: result,
                });
            }
        );
    });
};

const getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT orders.*, users.name, users.email, users.phone FROM orders INNER JOIN users ON orders.user_id = users.id";
        await pool.query(query, [], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy tất cả đơn hàng không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: data,
            });
        });
    });
};

const updateOrder = (order_id, body) => {
    const {
        order_status_payment,
        order_status_transport,
    } = body;

    return new Promise((resolve, reject) => {
        const query = `
            UPDATE orders
            SET order_status_payment = ?, order_status_transport = ?
            WHERE id = ?
        `;

        pool.query(
            query,
            [order_status_payment, order_status_transport, order_id],
            (err, result) => {
                if (err) {
                    return reject({
                        status: "ERROR",
                        message: "Cập nhật đơn hàng không thành công",
                        error: err,
                    });
                }
                resolve({
                    status: "OK",
                    message: "Cập nhật đơn hàng thành công",
                    data: result,
                });
            }
        );
    });
};

const getAllOrdersByUser = (user_id) => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT * FROM orders WHERE user_id =?";
        await pool.query(query, [user_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy đơn hàng của user không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: data,
            });
        });
    });
}

module.exports = {
    createOrder,
    getAllOrders,
    updateOrder,
    getAllOrdersByUser
};