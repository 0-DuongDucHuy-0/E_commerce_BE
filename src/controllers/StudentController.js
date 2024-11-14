const StudentServices = require("../services/StudentServices");

const createStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const {
      full_name,
      dob,
      gender,
      ethnicity,
      religion,
      major,
      class: studentClass,
      phone,
    } = req.body;

    if (
      !full_name ||
      !dob ||
      !gender ||
      !ethnicity ||
      !religion ||
      !major ||
      !studentClass ||
      !phone
    ) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Thiếu thông tin đăng ký",
      });
    }
    const result = await StudentServices.createStudent(studentId, req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const data = req.body;
    if (!studentId) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Không tồn tại tài khoản",
      });
    }
    const response = await StudentServices.uplateStudent(studentId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
}

const getAllStudent = async (req, res) => {
  try {
    const result = await StudentServices.getAllStudent();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: e,
    });
  }
}

const getDetailStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Chưa có student id",
      });
    }
    const result = await StudentServices.getDetailStudent(studentId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      message: e,
    });
  }
}

module.exports = {
  createStudent,
  updateStudent,
  getAllStudent,
  getDetailStudent
};
