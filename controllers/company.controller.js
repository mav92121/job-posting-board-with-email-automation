import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Company from "../models/company.model.js";
import { v4 as uuidv4 } from "uuid";

// Company Registration
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let company = await Company.findOne({ email });

    if (company) {
      return res.status(400).json({ msg: "Company already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = uuidv4();

    company = new Company({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationExpires: Date.now() + 3600000, // 1 hour
    });

    await company.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      html: `<p>Click the link to verify your account: <a href="http://localhost:5000/api/companies/verify/${verificationToken}">Verify</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ msg: "Error sending email" });
      } else {
        res.status(201).json({
          msg: "Company registered. Please check your email for verification link.",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Company Login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!company.isVerified) {
      return res.status(403).json({ msg: "Account not verified" });
    }

    const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Verify Account
export const verifyAccount = async (req, res) => {
  try {
    const company = await Company.findOne({
      verificationToken: req.params.token,
      verificationExpires: { $gt: Date.now() },
    });

    if (!company) {
      return res
        .status(400)
        .json({ msg: "Verification token is invalid or has expired" });
    }

    company.isVerified = true;
    company.verificationToken = undefined;
    company.verificationExpires = undefined;

    await company.save();

    res.json({ msg: "Account verified" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
