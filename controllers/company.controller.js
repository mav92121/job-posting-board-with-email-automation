import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import Company from "../models/company.model.js";
import twilio from "twilio";

export const registerCompany = async (req, res) => {
  const {
    name,
    email,
    phone: phoneNumber,
    size: employeeSize,
    company: companyName,
  } = req.body;
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    let company = await Company.findOne({ email });

    if (company) {
      return res.status(400).json({ msg: "Company already exists" });
    }

    // Generate verification token
    const verificationToken = uuidv4();
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const phoneOtp = Math.floor(100000 + Math.random() * 900000).toString();
    company = new Company({
      name,
      email,
      phoneNumber,
      companyName,
      employeeSize,
      verificationToken,
      emailOtp: emailOtp,
      phoneOtp: phoneOtp,
      otpExpires: Date.now() + 3600000,
    });

    await company.save();

    // Send verification email
    console.log("email", process.env.EMAIL_USER);
    console.log("pass", process.env.EMAIL_PASS);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `OTP for verifying email`,
      html: `<p>Your otp is ${emailOtp}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ msg: "Error sending email " + error });
      } else {
        res.status(201).json({
          msg: "Company registered. Please check your email for verification link.",
        });
      }
    });
    // console.log("phone Number ->", "+91" + phoneNumber);
    // await client.messages.create({
    //   body: `Your OTP code is ${phoneOtp}`,
    //   // from: process.env.TWILIO_PHONE_NUMBER,
    //   // to: "+91" + phoneNumber,
    //   from: "+18866990320",
    //   to: "+919327260135",
    // });

    res.status(201).json({ msg: "Company created and OTP sent" });
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
    if (company.emailOtp !== emailOtp || company.phoneOtp !== phoneOtp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    company.isEmailVerifed = true;
    company.isPhoneVerified = true;
    company.verificationToken = undefined;
    company.verificationExpires = undefined;
    company.emailOtp = undefined;
    company.phoneOtp = undefined;
    company.otpExpires = undefined;

    await company.save();

    res.json({ msg: "Account verified" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const verifyEmail = async (req, res) => {
  const { emailOtp } = req.body;
  try {
    const company = await Company.findOne({
      emailOtp,
    });
    if (!company) {
      return res
        .status(400)
        .json({ msg: "Verification token is invalid or has expired" });
    }
    if (company.emailOtp !== emailOtp || company.otpExpires < Date.now()) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    company.isEmailVerifed = true;
    company.emailOtp = undefined;
    company.otpExpires = undefined;
    await company.save();
    res.json({ msg: "Email verified" });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server error");
  }
};
