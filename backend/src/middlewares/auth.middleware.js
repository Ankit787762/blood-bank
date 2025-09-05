import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"


export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("🔑 Token received:", token); // check if token is coming

        if(!token){
             throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token , process.env.JWT_SECRET)
        console.log("✅ Decoded token:", decodedToken); // check decoded token
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
            if(!user){
                // next_video : discuss about frontend
                throw new ApiError(401, "InValid Access Token")
            }
    
            req.user =user;
            next()
    } catch (error) {
        next(error);
    }
})