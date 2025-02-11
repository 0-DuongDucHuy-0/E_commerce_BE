
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


module.exports = {
    getAllCategory,
};