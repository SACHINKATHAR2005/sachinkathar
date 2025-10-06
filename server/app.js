import express from "express";
import connectDB from "./src/db/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import userRouter from "./src/router/userRouter.js";
import heroRouter from "./src/router/heroRouter.js";
import skillRouter from "./src/router/skillRoutesr.js";
import projectRouter from "./src/router/projectRouter.js";
import certificateRouter from "./src/router/certificateRouter.js";
import blogRouter from "./src/router/blogRouter.js";
import leetCodeRouter from "./src/router/leetcode.route.js";
import contactRouter from "./src/router/contect.router.js";
import uploadRouter from "./src/router/upload.router.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://sachinkathar.vercel.app",
  "https://www.sachinkathar.tech",
  "https://sachinkathar.tech"
];

app.use(
  cors({
    origin: function (origin, callback) {
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

// Health check route for Render
app.get("/", (req, res) => res.send("Server is live!"));

// Routers
app.use("/user", userRouter);
app.use("/hero", heroRouter);   
app.use("/skill", skillRouter);
app.use("/project", projectRouter);
app.use("/certificate", certificateRouter);
app.use("/blog", blogRouter);
app.use("/dsa", leetCodeRouter);
app.use("/contact", contactRouter);
app.use("/upload", uploadRouter);

// Start server only after DB is connected
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB", err);
  }
};

startServer();
