const OrderServices = require("../services/OrderServices");

const createOrder = async (req, res) => {
    try {
        const user_id = req.params.id;
        if (!user_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có user_id",
            });
        }
        const { price, total_quantity, note, address, payment_method } = req.body
        console.log(`Order`, req.body)
        if (!price) {
            return res.status(400).json({
                status: "ERROR",
                message: "Missing required field: price",
            });
        }

        if (!total_quantity) {
            return res.status(400).json({
                status: "ERROR",
                message: "Missing required field: total_quantity",
            });
        }

        if (!address) {
            return res.status(400).json({
                status: "ERROR",
                message: "Missing required field: address",
            });
        }

        if (!payment_method) {
            return res.status(400).json({
                status: "ERROR",
                message: "Missing required field: payment_method",
            });
        }

        const result = await OrderServices.createOrder(user_id, req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const result = await OrderServices.getAllOrders();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    createOrder,
    getAllOrders
}