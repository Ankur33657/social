import responseHandler from "../common/responseHandler.js";
import UserModelService from "../models/userModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const UserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return responseHandler(res, 404, "unauthorize User", null);
    const decordMsg = await jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decordMsg;
    const user = await UserModelService?.getUser(userId);
    if (user) {
      req.user = user;
      next();
    } else {
      return responseHandler(res, 404, "unauthorize User", null);
    }
  } catch (error) {
    next(error);
  }
};

const AdminAuth = async (req, res, next) => {
  try {
    if (req.user?.isAdmin) {
      next();
    } else {
      return responseHandler(res, 404, "unauthorize Admin", null);
    }
  } catch (error) {
    next(error);
  }
};
const AuthHandler = { UserAuth, AdminAuth };
export default AuthHandler;
