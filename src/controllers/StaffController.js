const StaffServices = require("../services/StaffServices");

const approveDormRequest = async (req, res) => {
    try {
        const student_id = req.params.id;
        const approved = req.body.approved;
        const room_id = req.body.room_id;
        // kiểm tra xem có được duyệt hay ko ?
        if (approved) {
            // nếu chưa chọn phòng
            if (!room_id) {
                return res.status(200).json({
                    status: "ERR",
                    meassage: "Chưa chọn phòng",
                });
            } else {
                const response = await StaffServices.approveDormRequest(student_id, room_id);
                return res.status(200).json(response);
            }
        } else {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Yêu cầu vào ký túc xá đã bị từ chối",
            });
        }
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    approveDormRequest,
}