const pool = require("../models/db");

const uploadImage = (data) => {
    const { product_id, name, path } = req.body;
    return new Promise(async (resolve, reject) => {
        const query = `INSERT INTO product_images (product_id, name, path) VALUES (?, ?, ?)`;
        await pool.query(query, [product_id, name, path], (err, data) => {
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