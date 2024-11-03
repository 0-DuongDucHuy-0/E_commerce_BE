const UserService = require("../services/UserServices");

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
};
