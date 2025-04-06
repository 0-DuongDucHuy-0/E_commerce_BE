
const pool = require("../models/db");

const getAllCategory = async () => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT * FROM categories";
        await pool.query(query, (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy danh mục sản phẩm thất bại",
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

const getDetailCategory = async (category_id) => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT * FROM categories WHERE id = ?";
        await pool.query(query, [category_id], (err, result) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy chi tiết danh mục sản phẩm thất bại",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: result[0],
            });
        });
    });
}

module.exports = {
    getAllCategory,
    getDetailCategory
};