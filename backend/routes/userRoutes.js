import express from "express";
import {
  getProfile,
  updateProfile,
  calculateBMI,
  getBMIHistory
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile",authMiddleware,getProfile);
router.put("/profile",authMiddleware,updateProfile);
router.post("/bmi", authMiddleware, calculateBMI);
router.get("/bmi", authMiddleware, getBMIHistory);

export default router;