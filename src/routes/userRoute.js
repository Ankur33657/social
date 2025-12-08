import express from "express";
import UserController from "../controller/userController.js";
import AuthHandler from "../middleware/authHandler.js";
const router = express.Router();

router.get(
  "/allusers",
  AuthHandler.UserAuth,
  AuthHandler.AdminAuth,
  UserController?.getAllUsers,
);
router.get("/login", UserController?.loginUser);
router.post("/signup", UserController?.signUpUser);
router.get("/user", AuthHandler.UserAuth, UserController.getUser);
router.patch(
  "/user/updateprofile",
  AuthHandler.UserAuth,
  UserController.updateUserProfile,
);
export default router;
