const TransactionServices = require("../services/TransactionServices");


const createTransactions = async (req, res) => {
    try {
        const { order_id, product_id, price, quantity, name, avatar } = req.body;
        if (!order_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có order_id",
            });
        }

        if (!product_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có product_id",
            });
        }

        if (!price) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có price",
            });
        }

        if (!quantity) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có quantity",
            });
        }

        if (!name) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có name",
            });
        }

        if (!avatar) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có avatar",
            });
        }
        const result = await TransactionServices.createTransactions(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllTransactionsByUser = async (req, res) => {
    try {
        console.log(req.body)
        const { user_id, product_id } = req.body;
        if (!user_id || !product_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có user_id hoặc product_id",
            });
        }
        const result = await TransactionServices.getAllTransactionsByUser(user_id, product_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllProductByOrder = async (req, res) => {
    try {
        const order_id = req.params.id;
        console.log("ABS", order_id);
        if (!order_id) {
            return res.status(200).json({
                status: "ERR",
                message: "Chưa có order_id",
            });
        }
        const result = await TransactionServices.getAllProductByOrder(order_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    createTransactions,
    getAllTransactionsByUser,
    getAllProductByOrder
}