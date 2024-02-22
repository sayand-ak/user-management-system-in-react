import express from 'express';
import { authUser, registerUser, addProfileData, logoutUser, getUserProfile, updateUserProfile } from '../controller/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../controller/uploadController.js';
const router = express.Router();


router.post("/", registerUser);
router.patch("/setProfile", protect, upload, addProfileData);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload, updateUserProfile);

export default router;