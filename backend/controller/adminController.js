import asyncHandler from 'express-async-handler';
import Admin from '../model/adminModel.js';
import User from '../model/userModel.js'
import generateToken from '../auth/generateToken.js';
import path from 'path';
import fs from "fs";

// @desc login admin/ Set token
//route POST /api/admin/login
// access public
const login = asyncHandler(async(req, res) => {
    // const credentials = {
    //     username: "Sayand",
    //     password: "12345"
    // }
    const { username, password } = req.body;

    const admin = await Admin.findOne({username: username});

    if(admin && (await admin.matchPassword(password))){
        generateToken(res, admin._id);
        res.status(201).json({
            adminData: admin
        });
    }else{
        res.status(401);
        throw new Error("invalid user details!");
    }
});

const getUserData = asyncHandler(async(req, res) => {
    const userData = await User.find();
    if(userData){
        res.status(200).json(userData);
    }else{
        res.status(500)
        throw new Error("server error");
    }
})

// @desc register new user
//route POST /api/admin
// access public
const addUser = asyncHandler(async(req, res) => {
    const { fname, lname, email, phone, password, dob } = req.body;
    const profileImg = req.file;
    
    const userExist = await User.findOne({email: email});    
    if(userExist){
        res.status(400);
        throw new Error("User already exist!");
    }

    const newUser = await User.create({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        password: password,
        profile_image: profileImg ? profileImg.filename : null,
        dob: dob ? dob : null
    });    

    if(newUser){
        generateToken(res, newUser._id);
        res.status(201).json({
            message: "user added successfully"
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data")
    }
});

// @desc update user profile
//route PUT /api/admin
// access public
const updateUserProfile = asyncHandler(async(req, res) => {
    const {userId, fname, lname, email, dob, phone } = req.body;
    const image = req.file

    const user = await User.findById({_id: userId});
    if(user) {
        user.fname = fname || user.fname;
        user.lname = lname || user.lname;
        user.email = email || user.email;
        user.dob = dob || user.dob;
        user.phone = phone || user.phone;
        if(image){
            // finding and unlinking  the file
            const __filename = new URL(import.meta.url).pathname;
            const __dirname = path.dirname(__filename);
            const oldImgPath = user.profile_image ? path.join(__dirname,"..", 'uploads', user.profile_image): null;
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

export {login, getUserData, addUser, updateUserProfile};