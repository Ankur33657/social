import pool from "../config/db.js";
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const loginUser = async (userId, password) => {
  const result = await pool.query('SELECT * FROM "users" WHERE "userId" = $1', [
    userId,
  ]);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  return null;
};

const signUpUser = async (userId, emailId, fullName, password) => {
  const user = await pool.query(
    'INSERT INTO users ("userId","emailId","fullName","password") VALUES ($1,$2,$3,$4) RETURNING *',
    [userId, emailId, fullName, password],
  );

  if (user.rows.length > 0) {
    return user.rows[0];
  }
  return null;
};

const getUser = async (userId) => {
  const user = await pool.query('SELECT * FROM users WHERE "userId" = $1', [
    userId,
  ]);
  if (user.rows.length > 0) {
    return user.rows[0];
  }
  return null;
};

const updateUserProfile = async (userId, payload) => {
  const updatedUser = await pool.query(
    `UPDATE users
     SET "fullName" = COALESCE($1, "fullName"),
         "password"  = COALESCE($2, "password")
     WHERE "userId" = $3
     RETURNING *`,
    [payload.fullName, payload.password, userId],
  );
  if (updatedUser.rows.length > 0) {
    return updatedUser.rows[0];
  }
  return null;
};
const UserModelService = {
  getAllUsers,
  loginUser,
  signUpUser,
  getUser,
  updateUserProfile,
};

export default UserModelService;
