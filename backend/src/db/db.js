import mongoose from 'mongoose' ; 

const connectDB = async function () {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI) ;
        // console.log(db) ; 
        console.log('MongoDB connected successfully...');
        
    } catch (error) {
        console.log('MongoDB is disconnected: ' , error) ; 
        process.exit(1) ;
    }
}

export default connectDB ; 