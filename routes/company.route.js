import express from "express";
const router = express.Router();

import {
  registerCompany,
  loginCompany,
  verifyEmail,
} from "../controllers/company.controller.js";
// Company registration
router.post("/register", registerCompany);

// Company login
router.post("/login", loginCompany);

// Verify account
router.post("/verify/email", verifyEmail);

export default router;
