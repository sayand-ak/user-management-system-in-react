import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const protect = asyncHandler(async(req, res, next) => {
    let token = req.cookies.jwt;
    if(token){ 
        try { 
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.user_id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("unauthorized user, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("unauthorized user, no token");
    }
});

export { protect };