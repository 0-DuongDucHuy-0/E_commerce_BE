const pool = require("../models/db");

const createProduct = (data) => {
    const {
        name,
        description,
        content,
        avatar,
        category_id,
        price,
        sale,
        author,
        publisher,
        dimensions,
        publication_year,
        page_count,
        weight,
        cover_type
    } = data;

    return new Promise(async (resolve, reject) => {
        const query = `INSERT INTO products 
            (name, description, content, avatar, category_id, price, sale, author, publisher, dimensions, publication_year, page_count, weight, cover_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await pool.query(query,
            [name, description, content, avatar, category_id, price, sale, author, publisher, dimensions, publication_year, page_count, weight, cover_type],
            (err, data) => {
                if (err) {
                    return reject({
                        status: "ERROR",
                        message: "Tạo sản phẩm không thành công",
                        error: err,
                    });
                }

                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: data,
                });
            }
        );
    });
}


const getAllProducts = () => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT * FROM products";
        await pool.query(query, [], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy danh sách sản phẩm không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: data,
            });
        });
    });
};

const getDetailProduct = async (product_id) => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT * FROM products WHERE id = ?";
        await pool.query(query, [product_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy chi tiết sản phẩm không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: data,
            });
        });
    });
}

const getAllProductByCategory = async (category_id) => {
    return new Promise(async (resolve, reject) => {
        const query = "SELECT * FROM products WHERE category_id =?";
        await pool.query(query, [category_id], (err, data) => {
            if (err) {
                return reject({
                    status: "ERROR",
                    message: "Lấy danh sách sản phẩm theo danh mục không thành công",
                    error: err,
                });
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: data,
            });
        });
    });
}

module.exports = {
    createProduct,
    getAllProducts,
    getDetailProduct,
    getAllProductByCategory
};