import 'dotenv/config' ;
import express from 'express' ; 
import connectDB from './src/db/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors' ;
import userRouter from './src/routes/user.route.js';
import messageRouter from './src/routes/message.route.js';

connectDB() ; 

const app = express() ; 

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));

// Middleware
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000
app.get('/' , (req ,res) => {
    res.send('Backend is running.') ; 
}) ; 

app.use('/api/v1/user', userRouter)
app.use('/api/v1/message', messageRouter)

app.listen(PORT , () => {
    console.log(`Server is running on port: ${PORT}`)
})
