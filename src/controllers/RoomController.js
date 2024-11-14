const RoomServices = require("../services/RoomServices");

const getAllRoom = async (req, res) => {
    try {
        const gender = req.query.gender;
        const result = await RoomServices.getAllRoom(gender);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getDetailRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const result = await RoomServices.getDetailRoom(roomId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    getAllRoom,
    getDetailRoom
};
