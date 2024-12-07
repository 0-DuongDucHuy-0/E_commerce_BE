const StudentRequestsServices = require("../services/StudentRequestsServices");

const createRequest = async (req, res) => {
    try {
        const student_id = req.params.id;
        const { request_type, description } = req.body;
        if (
            !request_type ||
            !description
        ) {
            return res.status(200).json({
                status: "ERR",
                meassage: "Thiếu thông tin tọa yêu cầu",
            });
        }
        const result = await StudentRequestsServices.createRequest(student_id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

const updateRequestByStudent = async (req, res) => {
    try {
        const request_id = req.params.id;
        const { description } = req.body;
        console.log(req.body);
        if (!description) {
            return res.status(200).json({
                status: "ERR",
                meassage: "Thiếu thông tin chỉnh sửa yêu cầu",
            });
        }
        const result = await StudentRequestsServices.updateRequestByStudent(request_id, description);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

const updateRequestByStaff = async (req, res) => {
    try {
        const request_id = req.params.id;
        const { staff_id, status } = req.body;
        if (!status || !staff_id) {
            return res.status(200).json({
                status: "ERR",
                meassage: "Thiếu thông tin cập nhật req bởi quản lý",
            });
        }
        const result = await StudentRequestsServices.updateRequestByStaff(request_id, staff_id, status);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

module.exports = {
    createRequest,
    updateRequestByStudent,
    updateRequestByStaff
};