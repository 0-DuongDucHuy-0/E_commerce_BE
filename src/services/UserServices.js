const pool = require("../models/db");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices");

const signUp = async (newUser) => {
  const { email, password, role = "student" } = newUser;
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
        id: results[0].user_id,
        role: results[0].role,
      });
      const refresh_token = await genneralRefreshToken({
        id: results[0].user_id,
        role: results[0].role,
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
      const UserQuery = `SELECT * FROM users WHERE user_id = ? LIMIT 1`;

      // lấy ra thông tin
      const results = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(UserQuery, [userId], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Lỗi không tồn tại ủe",
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
      // const updateUserQuery = `UPDATE users SET ? WHERE user_id = ?`;
      // let updateData = "";
      // if (data.password) {
      //   updateData += " password = " + data.password;
      // }
      // if (data.role) {
      //   updateData += `, role = "` + data.role + `" `;
      // }
      const updateUserQuery = "UPDATE users SET ? WHERE user_id = ?";
      let updateData = {};
      if (data.password) {
        const hash_password = bcrypt.hashSync(data.password, 10);
        updateData.password = hash_password;
      }
      if (data.role) {
        updateData.role = data.role;
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

const deleteUser = (id) => { // chỉ xóa được sinh viên
  return new Promise(async (resolve, reject) => {
    // Cập nhật lại số người trong phòng ở bảng rooms
    const updateCurrentOccupancy = "UPDATE rooms SET current_occupancy = current_occupancy - 1 WHERE room_id = (SELECT room_id FROM students WHERE user_id = ?)";
    await pool.query(updateCurrentOccupancy, [id], (err, data) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Lỗi khi xóa tk o bang student",
          error: err,
        });
      }
    });

    // Xóa sinh viên ở bảng students
    const deleteStudentsQuery = "DELETE FROM students WHERE user_id = ?";
    await pool.query(deleteStudentsQuery, [id], (err, data) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Lỗi khi xóa tk o bang student",
          error: err,
        });
      }
    });

    // Xóa sinh viên ở bảng user
    const deleteQuery = "DELETE from users WHERE user_id = ?";
    await pool.query(deleteQuery, [id], (err, data) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Lỗi khi xóa tk o bang user",
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
  uplateUser,
  deleteUser,
};
