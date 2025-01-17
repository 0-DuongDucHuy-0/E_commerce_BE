const ProductImageServices = require("../services/ProductImageServices");

const uploadImage = async (req, res) => {
    try {
        const { product_id, path } = req.body;

        if (!product_id || !path) {
            return res.status(200).json({
                status: "ERR",
                message: "Thiếu thông tin ảnh sản phẩm",
            });
        }

        const result = await ProductImageServices.uploadImage(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllImagesById = async (req, res) => {
    try {
        const product_id = req.params.id;

        if (!product_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Thiếu thông tin sản phẩm",
            });
        }

        const result = await ProductImageServices.getAllImagesById(product_id);
        return res.status(200).json(result);

    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    uploadImage,
    getAllImagesById
}