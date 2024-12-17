const FeesServices = require("../services/FeesServices");

const createFees = async (req, res) => {
    try {
        const rooms_id = req.params.id;
        if (!rooms_id) {
            return res.status(200).json({
                status: "ERR",
                message: "chưa có id phòng không hợp lệ",
            });
        }
        const { ktx_fee, electricity_fee, water_fee } = req.body;
        if (!electricity_fee || !water_fee) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa nhập tiền điện/nước không hợp lệ",
            });
        }
        const result = await FeesServices.createFees(rooms_id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

const updateFees = async (req, res) => {
    try {
        const fees_id = req.params.id;
        if (!fees_id) {
            return res.status(200).json({
                status: "ERR",
                message: "chưa có id phòng",
            });
        }
        const result = await FeesServices.updateFees(fees_id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

const getAllFees = async (req, res) => {
    try {
        const result = await FeesServices.getAllFees();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

const getDetailFees = async (req, res) => {
    try {
        const fees_id = req.params.id;
        if (!fees_id) {
            return res.status(200).json({
                status: "ERR",
                message: "chưa có id phòng",
            });
        }
        const result = await FeesServices.getDetailFees(fees_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

const getAllFeesRoom = async (req, res) => {
    try {
        const rooms_id = req.params.id;
        if (!rooms_id) {
            return res.status(200).json({
                status: "ERR",
                message: "chưa có id phòng",
            });
        }
        const result = await FeesServices.getAllFeesRoom(rooms_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }

}

module.exports = {
    createFees,
    updateFees,
    getAllFees,
    getDetailFees,
    getAllFeesRoom
}