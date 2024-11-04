const pool = require("../models/db");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices");

const signUp = async (newUser) => {
  const { email, password, role } = newUser;
  const hash_password = bcrypt.hashSync(password, 10);

  return new Promise(async (resolve, reject) => {
    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;

    await pool.query(checkEmailQuery, [email], (err, results) => {
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
    await pool.query(query, [email, hash_password, role], (err, data) => {
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

const signIn = async (user) => {
  const { email, password } = user;
  return new Promise(async (resolve, reject) => {
    try {
      const checkEmailQuery = `SELECT * FROM users WHERE email = ? LIMIT 1`;
      await pool.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
          return reject({
            status: "ERROR",
            message: "Lỗi khi kiểm tra email",
            error: err,
          });
        }

        // Nếu email KO tồn tại
        if (results.length === 0) {
          return reject({
            status: "ERROR",
            message: "Email khônmg tồn tại.",
          });
        }
        // Nếu có email
        else {
          const comparePassword = bcrypt.compareSync(
            password,
            results[0].password
          );
          if (!comparePassword) {
            resolve({
              status: "ERR",
              message: "Sai mật khẩu",
            });
          }
          // cấp token cho user
          const access_token = genneralAccessToken({
            id: results[0].user_id,
            role: results[0].role,
          });
          const refresh_token = genneralRefreshToken({
            id: results[0].user_id,
            role: results[0].role,
          });

          resolve({
            status: "OK",
            message: "SUCCESS",
            access_token,
            refresh_token,
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    const query = "SELECT * FROM users";

    await pool.query(query, (err, data) => {
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
  signIn,
};
