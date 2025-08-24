import Message from "../model/contect/index.js";

// Create a new contact message
export const addMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "name, email, and message are required" });
    }
    const doc = await Message.create({ name, email, message, subject });
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Failed to create message" });
  }
};

// Get all messages (admin)
export const getMessages = async (_req, res) => {
  try {
    const list = await Message.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Failed to fetch messages" });
  }
};

// Delete a message (admin)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message || "Failed to delete" });
  }
};
