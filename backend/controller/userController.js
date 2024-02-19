import asyncHandler from "express-async-handler";
import Users from "../model/userModel.js";
import generateToken from "../auth/generateToken.js";
import userModel from "../model/userModel.js";
// @desc Auth user/ Set token
//route POST /api/user/auth
// access public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({email: email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
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

    const newUser = Users.create({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        password: password
    });
    

    if(newUser){
        generateToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        })
    }else{
        res.status(400);
        throw new Error("Invalid user data")
    }
})

// @desc logout user/ Set token
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
    res.status(200).json({ message: "update user profile" })
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}