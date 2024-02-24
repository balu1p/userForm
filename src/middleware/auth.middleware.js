import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const authentication = asyncHandler(async(req, res, next)=>{
   
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token) {
            throw new ApiError(401, "Unauthorized token!");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(error)
    }
})


export {authentication}