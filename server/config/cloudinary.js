import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads", // optional folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "pdf"], // adjust as needed
    resource_type: 'auto', // allow images and PDFs
  },
});

export const cloudinaryUploader = cloudinary;
export default storage;
