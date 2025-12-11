import pool from "../config/db.js";
const getAllConnections = async (accountId) => {
  const connection = await pool.query(
    'SELECT * FROM connections WHERE "fromaccountId"=$1 OR "toaccountId"=$1',
    [accountId],
  );
  if (connection.rows.length > 0) {
    return connection.rows[0];
  }
  return null;
};
const createConnection = async (fromaccountId, toaccountId) => {
  const connection = await pool.query(
    'INSERT INTO connections("fromaccountId","toaccountId","status")VALUES($1,$2,$3)',
    [fromaccountId, toaccountId, "pending"],
  );
  if (connection.rowCount > 0) {
    return connection.rows[0];
  }
  return null;
};

const actionConnection = async (fromaccountId, toaccountId, action) => {
  const connection = await pool.query(
    'UPDATE connections SET "status"=$1 WHERE "fromaccountId"=$2 AND "toaccountId"=$3',
    [action, fromaccountId, toaccountId],
  );
  if (connection.rowCount > 0) {
    return connection.rows[0];
  }
  return null;
};

const connectionExists = async (fromaccountId, toaccountId) => {
  const connectionExist = await pool.query(
    'SELECT *FROM connections WHERE "fromaccountId"=$1 AND "toaccountId"=$2',
    [fromaccountId, toaccountId],
  );

  if (connectionExist.rowCount > 0) return true;
  return false;
};

const connectionModelService = {
  getAllConnections,
  createConnection,
  actionConnection,
  connectionExists,
};
export default connectionModelService;
