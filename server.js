import express from "express";
import "dotenv/config";
import connectDB from "./config/database.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";

const app = express();
app.use(express.json());
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);

connectDB();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
