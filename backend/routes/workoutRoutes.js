import express from "express";

import {
  addWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  addWorkout
);

router.get(
  "/",
  authMiddleware,
  getWorkouts
);

router.put(
  "/:id",
  authMiddleware,
  updateWorkout
);

router.delete(
  "/:id",
  authMiddleware,
  deleteWorkout
);

export default router;