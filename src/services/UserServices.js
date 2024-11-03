const pool = require("../models/db");
const bcrypt = require("bcrypt");

const signUp = (newUser) => {
  const { email, password, role } = newUser;
  const hash_password = bcrypt.hashSync(password, 10);

  return new Promise((resolve, reject) => {
    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;

    pool.query(checkEmailQuery, [email], (err, results) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Lỗi khi kiểm tra email",
          error: err,
        });
      }

      // Nếu email đã tồn tại
      if (results.length > 0) {
        return reject({
          status: "ERROR",
          message: "Email đã tồn tại. Vui lòng chọn email khác.",
        });
      }
    });
    const query = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
    pool.query(query, [email, hash_password, role], (err, data) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Tạo user không thành công",
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

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";

    pool.query(query, (err, data) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Failed to fetch users",
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

module.exports = {
  getAllUser,
  signUp,
};
