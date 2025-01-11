const ProductImageServices = require("../services/ProductImageServices");

const uploadImage = async (res, req) => {
    try {
        const { product_id, name, path } = req.body;

        if (!product_id || !name || !path) {
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

module.exports = {
    uploadImage
}