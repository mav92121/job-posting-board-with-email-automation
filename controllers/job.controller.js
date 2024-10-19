import Job from "../models/job.model.js";
import nodemailer from "nodemailer";

// Post Job
export const postJob = async (req, res) => {
  const { title, description, experienceLevel, endDate, candidates } = req.body;
  try {
    const job = new Job({
      title,
      description,
      experienceLevel,
      company: req.companyId,
      endDate,
      candidates,
    });

    await job.save();

    // Send email to candidates
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    candidates.forEach((candidate) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidate.email,
        subject: `Job Posting: ${title}`,
        html: `<p>Dear candidate, check out this job opportunity: ${title}</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Error sending email to ${candidate.email}:`, error);
        }
      });
    });

    res.status(201).json({ msg: "Job posted and emails sent to candidates" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
