import pool from "../config/db.js";
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const UserModelService = {
  getAllUsers,
};

export default UserModelService;
