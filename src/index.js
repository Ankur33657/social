import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import errorHandling from "./middleware/errorHandling.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandling);
const port = process.env.PORT || 5001;
app.use("/api", userRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
