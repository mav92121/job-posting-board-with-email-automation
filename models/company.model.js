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
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationExpires: Date,
  phoneNumbers: String,
  employeeSize: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("company", companySchema);
export default Company;
