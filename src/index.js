import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5001;
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  res.json(`The current database is ${result.rows[0].current_database}`);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
