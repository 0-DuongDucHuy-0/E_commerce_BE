// const mysql = require("mysql");
// const dbConfig = require("../config/DatabaseConfig");

// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
//   port: "3306",
// });

// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected to the database");
// });

// module.exports = connection;

const mysql = require("mysql");
const dbConfig = require("../config/DatabaseConfig");

const createConnection = () => {
  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: "3306",
  });

  connection.connect((error) => {
    if (error) {
      console.error("Không thể kết nối đến cơ sở dữ liệu:", error);
      setTimeout(createConnection, 2000); // Thử kết nối lại sau 2 giây
    } else {
      console.log("Kết nối thành công đến cơ sở dữ liệu");
    }
  });

  connection.on("error", (error) => {
    if (
      error.code === "PROTOCOL_CONNECTION_LOST" ||
      error.code === "ECONNRESET"
    ) {
      console.error("Mất kết nối cơ sở dữ liệu:", error);
      createConnection(); // Tạo lại kết nối khi mất kết nối
    } else {
      throw error;
    }
  });

  return connection;
};

const connection = createConnection();

module.exports = connection;
