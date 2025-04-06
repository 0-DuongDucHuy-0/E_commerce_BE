const CategoryServices = require("../services/CategoryServices");

const getAllCategory = async (req, res) => {
    try {
        const result = await CategoryServices.getAllCategory();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getDetailCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CategoryServices.getDetailCategory(id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    getAllCategory,
    getDetailCategory
}