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

const updateRatting = async (data) => {
    const { rating_id, content, stars } = data;

    const updateQuery = "UPDATE ratings SET ? WHERE id = ?";
    let updateData = {};

    if (content) {
        updateData.content = content;
    }
    if (stars) {
        updateData.stars = stars;
    }

    try {
        const update = await new Promise((resolveQuery, rejectQuery) => {
            pool.query(updateQuery, [updateData, rating_id], (err, results) => {
                if (err) {
                    return rejectQuery({
                        status: "ERROR",
                        message: "Update đánh giá thất bại",
                        error: err,
                    });
                }
                resolveQuery(results);
            });
        });

        return {
            status: "OK",
            message: "SUCCESS",
            data: update,
        };
    } catch (error) {
        return error; // Trả về lỗi nếu truy vấn thất bại
    }
};


module.exports = {
    createRatting,
    updateRatting
};