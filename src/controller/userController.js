import responseHandler from "../common/responseHandler.js";
import UserModelService from "../models/userModel.js";
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModelService?.getAllUsers();
    responseHandler(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};
const UserController = {
  getAllUsers,
};

export default UserController;
