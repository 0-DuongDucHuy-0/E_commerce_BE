const pool = require("../models/db");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices");

const signUp = async (newUser) => {
  console.log("signUp", newUser)
  const { email, password, phone, address } = newUser;
  const name = email.split('@')[0];
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

    const query = `INSERT INTO users (name, email, password, phone,	address) VALUES (?, ?, ?,?,?)`;
    await pool.query(query, [name, email, hash_password, phone, address], (err, data) => {
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

  console.log('signin', user)

  return new Promise(async (resolve, reject) => {
    try {
      const checkEmailQuery = `SELECT * FROM users WHERE email = ? LIMIT 1`;

      // lấy ra thông tin
      const results = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(checkEmailQuery, [email], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Lỗi khi kiểm tra email",
              error: err,
            });
          }
          resolveQuery(results);
        });
      });

      // Nếu email không tồn tại
      if (results.length === 0) {
        return reject({
          status: "ERROR",
          message: "Email không tồn tại.",
        });
      }

      // Kiểm tra mật khẩu
      const comparePassword = bcrypt.compareSync(password, results[0].password);
      if (!comparePassword) {
        return resolve({
          status: "ERR",
          message: "Sai mật khẩu",
        });
      }

      // cấp token cho user
      const access_token = await genneralAccessToken({
        id: results[0].id,
        email: results[0].email,
      });
      const refresh_token = await genneralRefreshToken({
        id: results[0].id,
        email: results[0].email,
      });

      return resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const uplateUser = async (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UserQuery = `SELECT * FROM users WHERE id = ? LIMIT 1`;

      // lấy ra thông tin
      const results = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(UserQuery, [userId], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Lỗi không tồn tại user",
              error: err,
            });
          }
          resolveQuery(results);
        });
      });

      console.log("results", results);

      if (results === null) {
        resolve({
          status: "OK",
          message: "Người dùng không tồn tại",
        });
      }
      const updateUserQuery = "UPDATE users SET ? WHERE id = ?";
      let updateData = {};
      if (data.password) {
        const hash_password = bcrypt.hashSync(data.password, 10);
        updateData.password = hash_password;
      }
      if (data.address) {
        updateData.address = data.address;
      }
      if (data.phone) {
        updateData.phone = data.phone;
      }
      if (data.name) {
        updateData.name = data.name;
      }
      console.log("updateData", updateData);

      const updateUser = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(updateUserQuery, [updateData, userId], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Update thất bại",
              error: err,
            });
          }
          resolveQuery(results);
        });
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
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

const getDetailUser = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE id = ? LIMIT 1";
    pool.query(query, [userId], (err, data) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Failed to fetch user",
          error: err,
        });
      }
      if (data.length === 0) {
        return reject({
          status: "ERROR",
          message: "User not found",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: data[0],
      });
    });
  });
};

const changePassword = async (userId, data) => {
  console.log("change password", userId, data);
  return new Promise(async (resolve, reject) => {
    try {
      const UserQuery = `SELECT * FROM users WHERE id = ? LIMIT 1`;

      // lấy ra thông tin
      const results = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(UserQuery, [userId], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Lỗi không tồn tại user",
              error: err,
            });
          }
          resolveQuery(results);
        });
      });

      console.log("results", results);

      if (results === null) {
        resolve({
          status: "OK",
          message: "Người dùng không tồn tại",
        });
      }
      const comparePassword = bcrypt.compareSync(data.password, results[0].password);
      if (!comparePassword) {
        return reject({
          status: "ERROR",
          message: "Sai mật khẩu",
        });
      }
      const updateUserQuery = "UPDATE users SET ? WHERE id = ?";
      let updateData = {};
      if (data.newPassword) {
        const hash_password = bcrypt.hashSync(data.newPassword, 10);
        updateData.password = hash_password;
      }
      console.log("updateData", updateData);

      const updateUser = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(updateUserQuery, [updateData, userId], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Update thất bại",
              error: err,
            });
          }
          resolveQuery(results);
        });
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllUser,
  signUp,
  signIn,
  uplateUser,
  getDetailUser,
  changePassword,
};
