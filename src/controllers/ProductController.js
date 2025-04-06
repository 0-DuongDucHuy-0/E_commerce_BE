const ProductServices = require("../services/ProductServices");

const createProduct = async (req, res) => {
    try {
        const { name, description, content, avatar, category_id, price, author, publisher, dimensions, publication_year, page_count, weight, cover_type } = req.body;

        if (!name || !description || !content || !avatar || !category_id || !price || !author || !publisher || !dimensions || !publication_year || !page_count || !weight || !cover_type) {
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
        const result = await ProductServices.getDetailProduct(product_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllProductByCategory = async (req, res) => {
    try {
        const category_id = req.params.id;
        if (!category_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có category id",
            });
        }
        const result = await ProductServices.getAllProductByCategory(category_id);
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
    getDetailProduct,
    getAllProductByCategory
}