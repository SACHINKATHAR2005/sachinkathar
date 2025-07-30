import express from 'express';
import { addProject, deleteProject, getProjects, getSingleProject, updateProject } from '../controller/project.controller.js';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
const Router = express.Router();


Router.post("/create",upload.single("file"),authenticateUser,authorizeAdmin,addProject);
//  http://localhost:3000/project/create
Router.put("/update/:id",upload.single("file"),authenticateUser,authorizeAdmin,updateProject);
//  http://localhost:3000/project/update/:id
Router.get("/get",getProjects);
//  http://localhost:3000/project/get
Router.get("/get/:id",authenticateUser,authorizeAdmin,getSingleProject);
//  http://localhost:3000/project/get/:id
Router.delete("/delete/:id",authenticateUser,authorizeAdmin,deleteProject);
// http://localhost:3000/project/delete/:id
export default Router;
