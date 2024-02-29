import asyncHandler from "express-async-handler";
import Users from "../model/userModel.js";
import generateToken from "../auth/generateToken.js";
import userModel from "../model/userModel.js";
import path from 'path';
import fs from "fs";
import { log } from "console";

// @desc Auth user/ Set token
//route POST /api/user/auth
// access public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({email: email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            userData:user
        })
    }else{
        res.status(401);
        throw new Error("Invalid user data")
    }
})

// @desc register new user/ Set token
//route POST /api/user
// access public
const registerUser = asyncHandler(async(req, res) => {
    const { fname, lname, email, phone, password } = req.body;
    
    const userExist = await Users.findOne({email: email});    
    if(userExist){
        res.status(400);
        throw new Error("User already exist!");
    }

    const newUser = await Users.create({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        password: password,
        profile_image: null,
        dob: null
    });    

    if(newUser){
        generateToken(res, newUser._id);
        res.status(201).json({
            userData: newUser
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data")
    }
});

// @desc update user
//route POST /api/user/setProfile
// access protect
const addProfileData = asyncHandler(async(req, res) => {
    const {dob, user_id} = req.body;
    const image = req.file;

    const updatedProfile = await Users.findByIdAndUpdate(
        user_id,
        { $set: { profile_image: image.filename, dob: dob } },
        { new: true } 
      );

    if(updatedProfile){
        res.status(201).json({userData: updatedProfile});
    }else{ 
        res.status(500)
        throw new Error("server error");
    }
})

// @desc logout user
//route POST /api/user/logout
// access public
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "logout user" })
})

// @desc get user profile/ Set token
//route GET /api/user/profile
// access private
const getUserProfile = asyncHandler(async(req, res) => {
    let user = {
        fname: req.user.fname,
        lname: req.user.lname,
        email: req.user.email
    }
    res.status(200).json(user);
})

// @desc update user profile/ Set token
//route PUT /api/user
// access private
const updateUserProfile = asyncHandler(async(req, res) => {
    const {userId, name, dob, phone } = req.body;
    const fname = name.split(" ")[0];
    const lname = name.split(" ")[1];
    const image = req.file

    const user = await Users.findById({_id: userId});
    
    if(user) {
        user.fname = fname || user.fname;
        user.lname = lname || user.lname;
        user.dob = dob || user.dob;
        user.phone = phone || user.phone;
        if(image){
            // finding and unlinking  the file
            const __filename = new URL(import.meta.url).pathname;
            const __dirname = path.dirname(__filename);
            const oldImgPath = path.join(__dirname,"..", 'uploads', user.profile_image);
            if(oldImgPath){
                fs.unlinkSync(oldImgPath);
            }
            user.profile_image = image.filename;
        }
    };
    const updatedUser = await user.save();
    if(updatedUser) {
        res.status(201).json({userData: updatedUser});
    }else{
        res.status(500)
        throw new Error("server error");
    }
    
})

export {
    authUser,
    registerUser,
    addProfileData,
    logoutUser,
    getUserProfile,
    updateUserProfile
}