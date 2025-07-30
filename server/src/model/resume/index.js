// models/Resume.js
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model("Resume", resumeSchema); 
export default Resume;
