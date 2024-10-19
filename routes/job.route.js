import express from "express";
import { postJob } from "../controllers/job.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

// Post job (protected)
router.post("/post", authMiddleware, postJob);

export default router;
