import express from "express";
const router = express.Router();

import {
  registerCompany,
  loginCompany,
  verifyAccount,
} from "../controllers/company.controller.js";
// Company registration
router.post("/register", registerCompany);

// Company login
router.post("/login", loginCompany);

// Verify account
router.get("/verify/:token", verifyAccount);

export default router;
