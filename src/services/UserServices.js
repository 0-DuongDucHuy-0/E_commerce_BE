const pool = require("../models/db");

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";

    pool.query(query, (err, rows) => {
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
        data: rows,
      });
    });
  });
};

module.exports = {
  getAllUser,
};
