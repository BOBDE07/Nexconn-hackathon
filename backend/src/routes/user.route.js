import express from 'express' ; 
import { getUserDetail, registerUser, userLogin } from '../controllers/user.controller.js';
import userMiddleware from '../middleware/user.middleware.js';

const userRouter = express.Router() ; 

userRouter.post('/register' , registerUser) ; 
userRouter.post('/login' , userLogin) ; 
userRouter.get('/user-detail' , userMiddleware ,getUserDetail) ; 

export default userRouter ; 