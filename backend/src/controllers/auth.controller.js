import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup =  async (req,res)=>{
    // we'll create a user, hash their password (to store securely in the database) 
    // and create a token to let them know they are securely logged in 

    // this is the data that user is sending to us 
    const {email, fullName, password} = req.body;
    try {

        if (!email || !fullName || !password){
            return res.status(400).json({message: "No field should be empty!"})
        }

        // check if password is valid
        if (password.length < 8){
            return res.status(400).json({message: "Password must be atleast 8 characters"})
        }


        // if it is, check if the use email already exists in the database 
        const user = await User.findOne({email : email})
        if (user) return res.status(400).json({message: "User already exists"})

        // next we'll create a salt for the password 
        const salt = await bcrypt.genSalt(10)
        // create hashedPassword now 
        const hashedPassword = await bcrypt.hash(password, salt) 

        // finally create the user 
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        // if the user has been created
        if (newUser){
            // generate jwt token to be sent as a cookie to the user
            generateToken(newUser._id,res) 
            // then save the user to database 
            await newUser.save()
            // send a success status (201)
            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({message: "User could not be created"})
        }

        
    } catch (error) {
        console.log("Error in signup controller", error.message) 
        // 500 is the status code for interval server error 
        res.status(500).json({message: "Internal Server Error!"})
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body 
    try {
        const user = await User.findOne({email:email})
        if (!user){
            return res.status(400).json({message: "Invalid Credentials!"})
        }
        const isPassCorrect = await bcrypt.compare(password, user.password)
        if (!isPassCorrect){
            return res.status(400).json({message: "Invalid Credentials!"})
        }

        generateToken(user._id,res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error) 
        res.status(500).json({message: "Internal Server Error!"})
        
    }
}

export const logout = (req,res)=>{
    try {
        // to logout, just clear the cookie (cookie is just a string->empty it!)
        res.cookie("jwt","",{maxAge:0})
        // status code 200 means --> Everything is OK
        res.status(200).json({message: "Logged Out Successfully"})
    } catch (error) {
        console.log("Error in logout controller",error) 
        res.status(500).json({message: "Internal Server Error!"})
    }
}

export const updateProfile = async (req,res)=>{
    try {
        // first get the image from user
        const {profilePic} = req.body 
        const userId = req.user._id 

        if (!profilePic){
            req.status(400).json({message: "Profile pic not found"}) 
        }

        // if profile pic is obtained from the user, upload to cloudinary 
        const uploadedResponse = await cloudinary.uploader.upload(profilePic) 

        // update user profile pic in mongodb
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadedResponse.secure_url}, {new: true})
        
        // success! 
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in updateProfile controller",error) 
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user)    
    } catch (error) {
        console.log("Error in checkAuth controller", error)
        res.status(500).json({message: "Internal Server Error!"})
    }
}