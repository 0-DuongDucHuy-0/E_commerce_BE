const pool = require("../models/db");

const getAllRoom = async (gender) => {
    return new Promise(async (resolve, reject) => {
        let query;
        if (gender === "male") {
            query = "SELECT * FROM rooms WHERE room_number LIKE '%A%' AND current_occupancy < capacity";
        } else if (gender === "female") {
            query = "SELECT * FROM rooms WHERE room_number LIKE '%B%' AND current_occupancy < capacity";
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

const getDetailRoom = async (roomId) => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT rooms.*, students.full_name, students.class FROM rooms JOIN students ON rooms.room_id = students.room_id WHERE rooms.room_id = ?";
        await pool.query(query, roomId, (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "lỗi lấy chi tiết phòng",
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

const updateRoom = async (roomId, data) => {

    return new Promise(async (resolve, reject) => {
        console.log("data", data);
        const updateQuery = "UPDATE rooms SET ? WHERE room_id = ?";
        let updateData = {};
        if (data.capacity !== undefined) {
            updateData.capacity = data.capacity;
        }
        if (data.current_occupancy !== undefined) {
            updateData.current_occupancy = data.current_occupancy;
        }
        console.log("updateData", updateData);

        await pool.query(updateQuery, [updateData, roomId], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "lỗi update chi tiết phòng",
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
    getAllRoom,
    getDetailRoom,
    updateRoom
};
