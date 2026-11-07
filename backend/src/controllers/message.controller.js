import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import { Message } from "../model/message.model.js";

const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.receiverId;
        const { text, image, video } = req.body;

        // Validate receiver ID format
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid receiver ID."
            });
        }

        // Prevent sending messages to yourself
        if (senderId.toString() === receiverId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send a message to yourself."
            });
        }

        // Validate message content
        if (!text?.trim() && !image && !video) {
            return res.status(400).json({
                success: false,
                message: "Message content is required."
            });
        }

        // Verify receiver exists
        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found."
            });
        }

        // Derive messageType from content
        let messageType = "text";
        if (image) messageType = "image";
        else if (video) messageType = "video";

        const newMessage = await Message.create({
            senderId,
            receiverId,
            messageType,
            text,
            image,
            video
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: newMessage
        });

    } catch (error) {
        console.error("Error in sendMessage:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to send message."
        });
    }
};

const receiveMessage = async (req , res) => {
    try {
        const { receiverId , senderId } = req.params ;
        const receiver = await User.findById(receiverId) ; 
        const sender = await User.findById(senderId) ;
        if(!receiver ) {
            return res.status(400).json({
                success: false,
                message: "Receiver not found in database."
            });
        } 
        if(!sender ) {
            return res.status(400).json({
                success: false,
                message: "Sender not found in database."
            });
        } 
        
        if(receiver._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Receiver not authorized to receive messages from sender."
            });
        }

        // get messages between sender and receiver 
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Messages received successfully.",
            data: messages
        });
        
    } catch (error) {
        console.error("Error in receiveMessage:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to receive message."
        });
    }
}

const getMessage = async (req , res ) => {
    try {
        const { user1Id , user2Id } = req.params ;
        const user1 = await User.findById(user1Id) ; 
        const user2 = await User.findById(user2Id) ;
        if(!user1 ) {
            return res.status(400).json({
                success: false,
                message: "User1 not found in database."
            });
        } 
        if(!user2 ) {
            return res.status(400).json({
                success: false,
                message: "User2 not found in database."
            });
        } 
        
        if(user1._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "User1 not authorized to receive messages from user2."
            });
        }

        // get messages between user1 and user2 
        const messages = await Message.find({
            $or: [
                { senderId: user1Id, receiverId: user2Id },
                { senderId: user2Id, receiverId: user1Id }
            ]
        });

        return res.status(200).json({
            success: true,
            message: "Messages received successfully.",
            data: messages
        });
        
    } catch (error) {
        console.error("Error in getMessage:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to get message."
        });
    }
}

export {
    sendMessage
};
