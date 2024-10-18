import express from "express";
import "dotenv/config";
import connectDB from "./config/database.js";

const app = express();
app.use(express.json());

connectDB();
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
