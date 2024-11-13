const pool = require("../models/db");

const createStudent = async (studentId, newStudent) => {
  const {
    full_name,
    dob,
    gender,
    ethnicity,
    religion,
    major,
    class: studentClass,
    phone,
    approved = false,
  } = newStudent;

  return new Promise(async (resolve, reject) => {
    const query = `INSERT INTO students (user_id, full_name, dob,	gender,	ethnicity, religion,	major,	class,	phone,	approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(
      query,
      [
        studentId,
        full_name,
        dob,
        gender,
        ethnicity,
        religion,
        major,
        studentClass,
        phone,
        approved,
      ],
      (err, data) => {
        if (err) {
          return reject({
            status: "ERROR",
            message: "Tạo student không thành công",
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
};

module.exports = {
  createStudent,
};
