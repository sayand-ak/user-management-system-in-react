import express from 'express';
import { login, getUserData, addUser, updateUserProfile } from '../controller/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../controller/uploadController.js'
const adminRouter = express.Router();

adminRouter.post("/login", login);
adminRouter.get("/getUserData", getUserData);
adminRouter.post("/addUser", upload, addUser);
adminRouter.put("/updateUser", upload, updateUserProfile);

export default adminRouter;