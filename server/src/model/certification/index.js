// models/Certificate.js
import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String,required:true },
  issuer: { type: String, required: true },
  date: { type: Date },
  description: { type: String },
  link: { type: String },
  category:{type:String,default: "general",}
},{timestamps:true});

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;


// title, image, issuer, date, description, link, category