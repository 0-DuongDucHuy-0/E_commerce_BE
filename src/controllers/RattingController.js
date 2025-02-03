const RattingServices = require("../services/RattingServices");

const createRatting = async (req, res) => {
    try {
        const { product_id, user_id } = req.body;
        console.log("123", req.body)
        if (!user_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có user_id",
            });
        }

        if (!product_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có product_id",
            });
        }

        const result = await RattingServices.createRatting(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const updateRatting = async (req, res) => {
    try {
        console.log("uuuu", req.body)
        const { rating_id } = req.body;
        if (!rating_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có rating_id",
            });
        }

        const result = await RattingServices.updateRatting(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getRatingByProduct = async (req, res) => {
    try {
        const { product_id } = req.body;
        if (!product_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có product_id",
            });
        }
        const result = await RattingServices.getRatingByProduct(product_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });

    }
}

module.exports = {
    createRatting,
    updateRatting,
    getRatingByProduct
}