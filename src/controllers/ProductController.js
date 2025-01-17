const ProductServices = require("../services/ProductServices");

const createProduct = async (req, res) => {
    try {
        const { name, description, content, avatar, category_id, price } = req.body;

        if (!name || !description || !content || !avatar || !category_id || !price) {
            return res.status(200).json({
                status: "ERR",
                message: "Thiếu thông tin sản phẩm",
            });
        }

        const result = await ProductServices.createProduct(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const result = await ProductServices.getAllProducts();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const product_id = req.params.id;
        if (!product_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có student id",
            });
        }
        console.log("111", product_id);
        const result = await ProductServices.getDetailProduct(product_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getDetailProduct
}