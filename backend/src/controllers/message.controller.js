import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"

export const getUsersForSidebar = async (req,res)=>{

    try {
        const loggedInUser = req.user._id
        const filteredUsers = await Users.find({id: {$ne: loggedInUser}}).select("-password") 
        res.status(200).json(filteredUsers)       
    
    } catch (error) {
        console.log("error in message controller",error)
        res.status(500).json({message: "Internal Server Error"})
    }

}

export const getMessages = async (req,res)=>{
    try {
        const {id: userToChatId} = req.params // get id from /api/message/id and rename it
        // to userToChatId (remember the syntax to rename from url)
        const myId = req.user._id
        // now fetch messages between the user and me 
        const messages = await Message.find({
            $or:[
                {senderId:userToChatId, receiverId:myId},
                {senderId:myId, receiverId:userToChatId}
            ]
        })

        res.status(200).json(messages)
        
    } catch (error) {
        console.log("Error in getMessages controller", error.message) 
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const sendMessage = async (req,res)=>{
    try {
        const {text,image} = req.body 
        const {id: receiverId} = req.params 
        const senderId = req.user._id 

        let imageUrl // we'll store the image url that will be returned from cloudinary
        if (image){
            const uploadedResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadedResponse.secure_url
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            text: text,
            image: imageUrl
        })

        await newMessage.save() // await because we'll be writing this data in mongodb

        // send some response back 
        res.status(201).json(newMessage)

        
    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({message: "Internal Server Error!"})
    }
}