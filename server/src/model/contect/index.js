// models/Message.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
},{timestamps:true});

    const Message = mongoose.model("Message", messageSchema);
    export default Message;
