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

module.exports = {
    getAllRoom,
};
