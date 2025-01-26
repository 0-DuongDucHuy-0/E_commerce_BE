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
                        message: "Tạo đơn hàng không thành công",
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


module.exports = {
    createOrder,
};