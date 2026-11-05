import express from 'express' ; 
import { getUserDetail, registerUser, userLogin , updateUserProfile, deleteUserProfile } from '../controllers/user.controller.js';
import userMiddleware from '../middleware/user.middleware.js';

const userRouter = express.Router() ; 

userRouter.post('/register' , registerUser) ; 
userRouter.post('/login' , userLogin) ; 
userRouter.get('/user-detail' , userMiddleware ,getUserDetail) ; 
userRouter.post('/update-profile' , userMiddleware ,updateUserProfile ) ; 
userRouter.delete('/delete' , userMiddleware ,deleteUserProfile ) ; 
router.post('/logout', userMiddleware, logOutUser);

export default userRouter ; 