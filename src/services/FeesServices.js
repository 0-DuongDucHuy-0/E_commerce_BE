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

const updateFees = async (fee_id, data) => {
    return new Promise(async (resolve, reject) => {
        const query = "UPDATE monthly_fees SET ? WHERE fee_id = ?"
        let updateData = {}
        if (data.ktx_fee) {
            updateData.ktx_fee = data.ktx_fee;
        }
        if (data.electricity_fee) {
            updateData.electricity_fee = data.electricity_fee;
        }
        if (data.water_fee) {
            updateData.water_fee = data.water_fee;
        }
        if (data.status) {
            updateData.status = data.status;
        }
        await pool.query(query, [updateData, fee_id], (err, results) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lỗi khi cập nhật chi phí",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "Cập nhật chi phí thành công",
                data: results,
            });
        });
    });
}

module.exports = {
    createFees,
    updateFees
}
