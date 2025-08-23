import express from "express";
import upload from "../middleware/upload.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";
import { addCertificate, deleteCertificate, getCertificates, getSingleCertificate, updateCertificate } from "../controller/certification.controller.js";





const Router = express.Router();
Router.post("/add",upload.single("file"),authenticateUser,authorizeAdmin,addCertificate);
// http://localhost:3000/certificate/add
Router.put("/update/:id",upload.single("file"),authenticateUser,authorizeAdmin,updateCertificate);
// http://localhost:3000/certificate/update/:id
Router.get("/get",getCertificates);
//http://localhost:3000/certificate//get
Router.get("/get/:id",getSingleCertificate);
//http://localhost:3000/certificate/get/:id
Router.delete("/delete/:id",authenticateUser,authorizeAdmin,deleteCertificate);
//http://localhost:3000/certificate/delete/:id



export default Router;


