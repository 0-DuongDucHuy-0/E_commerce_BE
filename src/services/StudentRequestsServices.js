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

const updateRequestByStudent = async (requestId, description) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE student_requests SET description = ? WHERE request_id = ?";
        pool.query(query, [description, requestId], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Update req thất bại",
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
};

const updateRequestByStaff = async (request_id, staff_id, status) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE student_requests SET staff_id = ?, status = ? WHERE request_id = ?";
        pool.query(query, [staff_id, status, request_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Update req bởi staff thất bại",
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

const getAllRequests = async () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM student_requests";
        pool.query(query, (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "lỗi khi lấy toàn bộ req",
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

const getAllRequestsStudent = async (student_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM student_requests WHERE student_id =?";
        pool.query(query, [student_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lỗi lấy req của sinh viên",
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

const getDetailRequest = async (request_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM student_requests WHERE request_id =?";
        pool.query(query, [request_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lỗi lấy chi tiết req",
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
    createRequest,
    updateRequestByStudent,
    updateRequestByStaff,
    getAllRequests,
    getAllRequestsStudent,
    getDetailRequest
};