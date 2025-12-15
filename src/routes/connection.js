import express from "express";
import AuthHandler from "../middleware/authHandler.js";
import connectionController from "../controller/connectionController.js";
const connectionRouter = express.Router();

connectionRouter.get(
  "/allconnections",
  AuthHandler?.UserAuth,
  connectionController.getAllConnections,
);

connectionRouter.post(
  "/createconnection",
  AuthHandler?.UserAuth,
  connectionController.createConnection,
);
connectionRouter.post(
  "/actionconnection",
  AuthHandler?.UserAuth,
  connectionController.actionConnection,
);

export default connectionRouter;
