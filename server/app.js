import express from "express";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import CORS

dotenv.config();

import userRouter from "./src/router/userRouter.js";
import heroRouter from "./src/router/heroRouter.js";
import skillRouter from "./src/router/skillRoutesr.js";
import projectRouter from "./src/router/projectRouter.js";
import certificateRouter from "./src/router/certificateRouter.js";
import blogRouter from "./src/router/blogRouter.js";
import leetCodeRouter from "./src/router/leetcode.route.js"
import contactRouter from "./src/router/contect.router.js"
import uploadRouter from "./src/router/upload.router.js"
const app = express();


const allowedOrigins = [
  "http://localhost:3000",
  "https://sachinkathar.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/hero", heroRouter);   
app.use("/skill",skillRouter);
app.use("/project",projectRouter);
app.use("/certificate",certificateRouter);
app.use("/blog",blogRouter);
app.use("/dsa",leetCodeRouter)
app.use("/contact", contactRouter)
app.use("/upload", uploadRouter)


connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
