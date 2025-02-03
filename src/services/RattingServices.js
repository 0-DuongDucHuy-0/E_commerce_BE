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

const getRatingByProduct = (product_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT ratings.*, users.name FROM ratings JOIN users ON ratings.user_id = users.id WHERE ratings.product_id = ?";
        pool.query(query, [product_id], (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy đánh giá theo sản phẩm không thành công",
                    error: err.message || err,
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
    createRatting,
    updateRatting,
    getRatingByProduct
};