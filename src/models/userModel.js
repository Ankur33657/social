import pool from "../config/db.js";
const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const loginUser = async (userId) => {
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

const existAccount = async (toaccountId) => {
  const account = await pool.query('SELECT *FROM users WHERE "accountId"=$1', [
    toaccountId,
  ]);
  if (account.rows.length > 0) {
    return true;
  }
  return false;
};

const updateUserProfile = async (userId, payload) => {
  const updatedUser = await pool.query(
    `UPDATE users
     SET "fullName" = COALESCE($1, "fullName"),
         "password"  = COALESCE($2, "password"),
         "personal_details"=COALESCE($3, "personal_details"),
         "education"=COALESCE($4, "education"),
         "family_details"=COALESCE($5, "family_details")
     WHERE "userId" = $6
     RETURNING *`,
    [
      payload.fullName,
      payload.password,
      payload.personal_details,
      payload.education,
      payload.family_details,
      userId,
    ],
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
  existAccount,
};

export default UserModelService;
