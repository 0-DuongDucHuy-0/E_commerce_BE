const pool = require("../models/db");

const getAllRoom = async (gender) => {
    return new Promise(async (resolve, reject) => {
        let query;
        if (gender === "male") {
            query = "SELECT * FROM rooms WHERE room_number LIKE '%A%'";
        } else if (gender === "female") {
            query = "SELECT * FROM rooms WHERE room_number LIKE '%B%'";
        } else {
            query = "SELECT * FROM rooms";
        }

        await pool.query(query, (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lỗi lấy toàn bộ phòng",
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
    getAllRoom,
};
