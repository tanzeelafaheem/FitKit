import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import workoutRoutes from './routes/workoutRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("FitKit Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});