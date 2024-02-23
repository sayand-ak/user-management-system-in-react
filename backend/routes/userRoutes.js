import express from 'express';
import { authUser, registerUser, addProfileData, logoutUser, getUserProfile, updateUserProfile } from '../controller/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../controller/uploadController.js';
const userRouter = express.Router();


userRouter.post("/", registerUser);
userRouter.patch("/setProfile", protect, upload, addProfileData);
userRouter.post("/auth", authUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, upload, updateUserProfile);

export default userRouter;