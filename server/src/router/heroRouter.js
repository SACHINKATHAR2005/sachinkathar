import express from "express";import {
  addHero,
  getHero,
  getAllHeroes,
  updateHero,
  deleteHero,
  deleteHeroTitle,
  contectInfo,
} from "../controller/hero.controller.js";

import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
const Router = express.Router();


Router.post("/create",upload.single("file"),authenticateUser,authorizeAdmin,addHero);

// http://localhost:3000/hero/create

Router.get("/", getHero);
// http://localhost:3000/hero/
Router.get("/all", getAllHeroes);
// http://localhost:3000/hero/all
Router.put("/upload/:id",upload.single("file"),authenticateUser, authorizeAdmin, updateHero);
// http://localhost:3000/hero/upload/:id
Router.delete("/delete/:id",authenticateUser,authorizeAdmin, deleteHero);

// http://localhost:3000/hero/delete/:id
Router.patch("/patch/remove-title",authenticateUser,authorizeAdmin, deleteHeroTitle);
  // http://localhost:3000/hero/patch/remove-title

  Router.post("/contect",contectInfo);

export default Router;


// router.post("/create", addHero);
// router.get("/", getHero);
// router.get("/all", getAllHeroes);
// router.put("/:id", updateHero);
// router.delete("/:id", deleteHero);
// router.patch("/remove-title", deleteHeroTitle);


// http://localhost:3000/user/login       -admin
// http://localhost:3000/user/create       -admin
// http://localhost:3000/hero/addHero       -admin
//http://localhost:3000/hero/                -user
//http://localhost:3000/hero/all               -user
//http://localhost:3000/hero/upload/:id            -admin
//http://localhost:3000/hero/delete/:id         -admin
//http://localhost:3000/hero/patch/remove-title   -admin 