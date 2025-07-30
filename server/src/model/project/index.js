// models/Work.js
import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Optional thumbnail or logo
  link: { type: String },  // Live site or proof
  github: { type: String }, // For projects
  blogLink: { type: String }, // Optional blog
  company: { type: String }, // Only for internships
  category: {
    type: String,
    enum: ["project", "internship"],
    required: true,
  },
  techStack: [String], // Optional: ["React", "Node", "MongoDB"]
  startDate: { type: Date },
  endDate: { type: Date },
}, {
  timestamps: true
});

const Work = mongoose.model("Work", workSchema);
export default Work;


// title, description, image, link, github, blogLink, company, category, techStack, startDate, endDate