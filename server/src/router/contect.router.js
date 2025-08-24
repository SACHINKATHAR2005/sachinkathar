import express from "express";
import { addMessage, getMessages, deleteMessage } from "../controller/contect.controller.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";

const Router = express.Router();

// Public: submit a contact message
Router.post("/create", addMessage);

// Admin: list and delete
Router.get("/get", authenticateUser, authorizeAdmin, getMessages);
Router.delete("/delete/:id", authenticateUser, authorizeAdmin, deleteMessage);

export default Router;
