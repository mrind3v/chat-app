import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import User from "../models/user.model.js"
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req,res)=>{

    try {
        const loggedInUser = req.user._id
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password") 
        res.status(200).json(filteredUsers)       
    
    } catch (error) {
        console.log("error in message controller",error)
        res.status(500).json({message: "Internal Server Error"})
    }

}

export const getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

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

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // send some response back 
        res.status(201).json(newMessage)

        
    } catch (error) {
        console.log("Error in sendMessage controller", error.message)
        res.status(500).json({message: "Internal Server Error!"})
    }
}