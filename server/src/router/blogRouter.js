import express from "express";
import upload from "../middleware/upload.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";
import { addblog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from "../controller/blog.controller.js";

const Router = express.Router();




Router.post("/create", upload.single("file"), authenticateUser, authorizeAdmin, addblog);

// http://localhost:3000/blog/create
Router.put("/update/:id", authenticateUser,authorizeAdmin,upload.single("file"),updateBlog);
// http://localhost:3000/blog/update/:id
Router.get("/get",getAllBlogs);
// http://localhost:3000/blog/get
Router.get("/get/:id",getSingleBlog);
// http://localhost:3000/blog/get/:id
Router.delete("/delete/:id",authenticateUser,authorizeAdmin,deleteBlog);
// http://localhost:3000/blog/delete/:id
export default Router;