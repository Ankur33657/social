import responseHandler from "../common/responseHandler.js";
import connectionModelService from "../models/connectionModel.js";
import UserModelService from "../models/userModel.js";

const getAllConnections = async (req, res, next) => {
  try {
    const accountId = req.user.accountId;
    const connections =
      await connectionModelService.getAllConnections(accountId);
    return responseHandler(
      res,
      200,
      "connection fetched successfully",
      connections,
    );
  } catch (error) {
    next(error);
  }
};

const createConnection = async (req, res, next) => {
  try {
    const { toaccountId } = req.body;
    if (toaccountId === req.user.accountId)
      return responseHandler(res, 400, "cannot connect to self", null);
    const isAccountExist = await UserModelService.existAccount(toaccountId);
    if (!isAccountExist) {
      return responseHandler(res, 404, "Account not found", null);
    }
    const connectionExists = await connectionModelService?.connectionExists(
      req.user.accountId,
      toaccountId,
    );

    if (connectionExists) {
      return responseHandler(res, 400, "connection already exists", null);
    }
    const connection = await connectionModelService.createConnection(
      req.user.accountId,
      toaccountId,
    );
    if (connection)
      return responseHandler(
        res,
        201,
        "connection created successfully",
        connection,
      );
    return responseHandler(res, 400, "connection already exists!!", null);
  } catch (error) {
    next(error);
  }
};

const actionConnection = async (req, res, next) => {
  try {
    const { fromaccountId, action } = req.body;
    const connectionExists = await connectionModelService?.connectionExists(
      req.user.accountId,
      fromaccountId,
    );
    if (!connectionExists) {
      return responseHandler(res, 400, "connection not found", null);
    }
    const response = await connectionModelService?.actionConnection(
      fromaccountId,
      req.user.accountId,
      action ? "accepted" : "rejected",
    );
    if (response) {
      return responseHandler(
        res,
        200,
        `connection  ${action ? "accepted" : "rejected"} successfully`,
        response,
      );
    }
    return responseHandler(res, 400, "connection not found", null);
  } catch (error) {
    next(error);
  }
};
const ConnectionController = {
  getAllConnections,
  createConnection,
  actionConnection,
};
export default ConnectionController;
