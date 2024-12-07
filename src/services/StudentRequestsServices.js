const pool = require("../models/db");

const createRequest = async (student_id, dataRequest) => {
    const {
        request_type, description
    } = dataRequest;

    return new Promise(async (resolve, reject) => {
        const query = `INSERT INTO student_requests (student_id, request_type, description) VALUES (?, ?, ?)`;
        await pool.query(
            query,
            [
                student_id,
                request_type, description
            ],
            (err, data) => {
                if (err) {
                    return reject({
                        status: "ERROR",
                        message: "Tạo req không thành công",
                        error: err,
                    });
                }
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: data,
                });
            }
        );
    });
}

module.exports = {
    createRequest
};