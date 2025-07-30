// models/Hero.js
import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  titles: {
    type: [String], // e.g., ["Full-Stack Developer", "AWS Learner"]
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  education: {
    type: String, // e.g., "B.Tech CSE, 7th Sem, XYZ University"
  },
  resume: {
    url: { type: String },     // resume download/view URL
    publicId: { type: String }, // cloudinary public_id if using Cloudinary
  },
  profileImage: {
    url: { type: String },     // image URL
    publicId: { type: String }, // cloudinary public_id
  },
  location: {
    type: String, // e.g., "India", "Remote"
  },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    portfolio: { type: String }, // optional portfolio link
  },
}, {
  timestamps: true
});

const Hero = mongoose.model("Hero", heroSchema);
export default Hero;

// name, titles, about, education, resume, profileImage, location, socialLinks