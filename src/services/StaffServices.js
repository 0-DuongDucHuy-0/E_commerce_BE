const pool = require("../models/db");

const approveDormRequest = async (student_id, room_id) => {
    return new Promise(async (resolve, reject) => {
        // tăng số lượng trong rooms thêm 1 người
        const roomQuery = "UPDATE rooms SET current_occupancy = current_occupancy + 1 WHERE room_id = ?";
        await pool.query(roomQuery, [room_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lỗi khi thêm 1 người vào phòng",
                    error: err,
                });
            }
        });

        const query = "UPDATE students SET approved = true, room_id = ? WHERE student_id = ?"
        await pool.query(query, [room_id, student_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lỗi khi cập nhật bảng student khi staff đồng ý yêu cầu vào ktx",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: data,
            });
        })
    })
}

module.exports = {
    approveDormRequest
}