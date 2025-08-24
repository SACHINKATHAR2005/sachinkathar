import express from "express";
import upload from "../middleware/upload.js";

const Router = express.Router();

// Upload a single file and return its URL (Cloudinary)
Router.post("/image", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }
    // multer-storage-cloudinary places the uploaded file URL at file.path
    const url = req.file.path;
    return res.status(201).json({ success: true, url, file: req.file });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Upload failed" });
  }
});

export default Router;
