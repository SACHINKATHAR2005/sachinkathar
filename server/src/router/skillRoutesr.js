import express from "express";
import { addSkill, deleteSkill, getSkills, updateSkill } from "../controller/skill.contoller.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const Router = express.Router();

Router.post("/create",upload.single("file"),authenticateUser,authorizeAdmin,addSkill);
Router.put("/update/:id",authenticateUser,authorizeAdmin,updateSkill);
Router.get("/get",getSkills);
Router.delete("/delete/:id",authenticateUser,authorizeAdmin,deleteSkill);

 //  http://localhost:3000/skill/create




export default Router;