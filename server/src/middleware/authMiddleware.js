import jwt from "jsonwebtoken";
import {User} from "../model/user/index.js";


export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token from cookie:", token);

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

    const user = await User.findById(decoded._Id).select("-password");
   

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};





export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied. Admin privileges required." });
  }
  next();
};