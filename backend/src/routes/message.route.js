import express from "express" ; 

import { sendMessage } from "../controllers/message.controller.js" ; 
import userMiddleware from "../middleware/user.middleware.js";

const messageRouter = express.Router() ; 

messageRouter.post("/send/:receiverId", userMiddleware, sendMessage);

export default messageRouter ; 