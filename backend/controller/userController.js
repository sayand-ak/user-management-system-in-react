import asyncHandler from "express-async-handler"
// @desc Auth user/ Set token
//route POST /api/user/auth
// access public
const authUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Auth user" })
})

// @desc register new user/ Set token
//route POST /api/user
// access public
const registerUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "register user" })
})

// @desc logout user/ Set token
//route POST /api/user/logout
// access public
const logoutUser = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "logout user" })
})

// @desc get user profile/ Set token
//route GET /api/user/profile
// access private
const getUserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "user profile" })
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