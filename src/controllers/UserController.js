const UserService = require("../services/UserServices");

const signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Thiếu thông tin đăng ký",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Email không hợp lệ",
      });
    } else if (password != confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Xác nhận mật khẩu không hợp lệ",
      });
    }

    const result = await UserService.signUp(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await UserService.getAllUser();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getAllUser,
  signUp,
};
