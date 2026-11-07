import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    messageType: {
        type: String,
        enum: ["text", "image", "video", "audio", "file"],
        default: "text",
    },
    text: {
        type: String,
        trim: true,
    },
    image: String,
    video: String,
    audio: String,
    file: String,

    isRead: {
        type: Boolean,
        default: false,
    },

    readAt: Date,

    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);
