import  express from 'express';
import { authMe, userCreate, userLogin } from '../controller/userlogin.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
const Router = express.Router();

Router.post("/create",userCreate);
// http://localhost:3000/user/create

Router.post("/login",userLogin);
// http://localhost:3000/user/login
// http://localhost:3000/user/create

Router.get("/me",authenticateUser,authMe);


// Router.get("/test-auth", authenticateUser, (req, res) => {
//   res.json({
//     message: "Middleware working",
//     user: req.user,
//   });
// });



export default Router;


