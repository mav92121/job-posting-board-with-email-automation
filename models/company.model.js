import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  isEmailVerifed: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  phoneNumber: String,
  employeeSize: Number,
  otpExpires: Date,
  emailOtp: String,
  phoneOtp: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("company", companySchema);
export default Company;
