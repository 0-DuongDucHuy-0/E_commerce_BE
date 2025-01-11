const pool = require("../models/db");

const uploadImage = (data) => {
    const { product_id, name, path } = data;
    return new Promise(async (resolve, reject) => {
        const query = `INSERT INTO products_images (product_id, path) VALUES (?, ?)`;
        await pool.query(query, [product_id, path], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Tạo ảnh không thành công",
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
    uploadImage
};