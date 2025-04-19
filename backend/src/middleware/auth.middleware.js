import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req,res,next)=>{
    try {

        // get the token from cookie ()
        const token = req.cookies.jwt  // .jwt becus that's the name of the token we kept 

        if (!token){
            return res.status(401).json({message: "Unauthorized - Token not found"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded){
             return res.status(401).json({message: "Unauthorized - Invalid Token"}) 
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user){
           return res.status(404).json({message: "User not found"}) 
        }

        req.user = user 

        next() // next function would be updateProfile if everything is fine till here
        
    } catch (error) {
        console.log("Error in protectRoute middleware")
        res.status(500).json({message: "Internal Server Error!"})
    }
}