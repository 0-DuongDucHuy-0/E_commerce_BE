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

module.exports = {
  createStudent,
};
