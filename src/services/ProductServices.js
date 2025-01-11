const pool = require("../models/db");

const createProduct = (data) => {
    const { name, description, content, avatar, category_id, price } = data;
    return new Promise(async (resolve, reject) => {
        const query = `INSERT INTO products (name, description, content, avatar, category_id, price) VALUES (?, ?, ?, ?, ?, ?)`;
        await pool.query(query, [name, description, content, avatar, category_id, price], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Tạo sản phẩm không thành công",
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
    createProduct
};