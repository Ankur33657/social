import responseHandler from "../common/responseHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import UserModelService from "../models/userModel.js";
const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModelService?.getAllUsers();
    responseHandler(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password) {
      return responseHandler(res, 400, "Invalid credentials", null);
    }
    const user = await UserModelService?.loginUser(userId);
    if (user) {
      const hashPassword = await bcrypt.compare(password, user.password);
      if (!hashPassword) {
        return responseHandler(res, 400, "Invalid credentials", null);
      }
      const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET);
      res.cookie("token", token, { httpOnly: true });
      delete user.password;
      return responseHandler(res, 200, "User logged in successfully", {
        user,
        token,
      });
    }
    return responseHandler(res, 404, "User not found", null);
  } catch (error) {
    next(error);
  }
};

const signUpUser = async (req, res, next) => {
  try {
    const { userId, emailId, fullName, password } = req.body;
    if (!userId || !emailId || !fullName || !password)
      return responseHandler(res, 404, "Missing Parameters", null);
    const validEmail = validator.isEmail(emailId);
    if (!validEmail) {
      return responseHandler(res, 400, "Invalid email", null);
    }
    const isStrongPassword = validator.isStrongPassword(password);
    if (!isStrongPassword)
      return responseHandler(res, 400, "week Password", null);
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await UserModelService?.signUpUser(
      userId,
      emailId,
      fullName,
      hashPassword,
    );
    if (user) {
      delete user.password;
      return responseHandler(res, 201, "User Created successfully", user);
    }
    return responseHandler(res, 400, "something wents wrong", null);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    delete user.password;
    return responseHandler(res, 200, "user fetch successfully", user);
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    let payload = req.body;
    let hashPassword = "";
    if (payload?.password) {
      const isStrongPassword = validator.isStrongPassword(password);
      if (!isStrongPassword)
        return responseHandler(res, 400, "week Password", null);
      hashPassword = await jwt.hash(password, 12);
      payload = { ...payload, password: hashPassword };
    }
    const user = await UserModelService?.updateUserProfile(
      req.user?.userId,
      payload,
    );
    if (user) {
      delete user.password;
      return responseHandler(res, 200, "Profile Update successfully", user);
    }
    return responseHandler(res, 500, "internal server error", null);
  } catch (error) {
    next(error);
  }
};

const UserController = {
  getAllUsers,
  loginUser,
  signUpUser,
  getUser,
  updateUserProfile,
};

export default UserController;
