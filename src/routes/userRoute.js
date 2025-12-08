import express from "express";
import UserController from "../controller/userController.js";
const router = express.Router();

router.get("/", UserController?.getAllUsers);
export default router;
