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
  isEmailVerifed: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationExpires: Date,
  phoneNumber: String,
  employeeSize: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("company", companySchema);
export default Company;
