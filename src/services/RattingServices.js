const pool = require("../models/db");


const createRatting = (data) => {
    const { content = "", stars = 3, product_id, user_id } = data
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ratings (content, stars, product_id, user_id) 
                        VALUES (?,?,?,?)`;

        pool.query(query, [content, stars, product_id, user_id], (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Tạo đánh giá không thành công",
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
    createRatting,
};