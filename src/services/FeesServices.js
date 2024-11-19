const pool = require("../models/db");

const createFees = async (room_id, data) => {
    return new Promise(async (resolve, reject) => {
        const { ktx_fee = 200000, electricity_fee, water_fee } = data;
        const query = "INSERT INTO monthly_fees (room_id, ktx_fee, electricity_fee, water_fee) VALUES (?,?,?,?)";
        await pool.query(query, [room_id, ktx_fee, electricity_fee, water_fee], (err, results) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lỗi khi tạo chi phí",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "Tạo chi phí thành công",
                data: results,
            });
        });
    });
}

module.exports = {
    createFees,
}
