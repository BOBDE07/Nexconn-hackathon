import { User } from "../model/user.model.js";
import generateToken from "../utils/generateToken.utils.js";


const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body ;

        // Validate fields
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already registered with this email.'
            });
        }

        // Create user
        const user = await User.create({
            fullname,
            email,
            password
        });

        // Generate JWT
        const token = generateToken(user._id);

        // Remove password from response
        const safeUser = user.toObject();
        delete safeUser.password;

        // Send response
        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user: safeUser,
            token
        });

    } catch (error) {
        console.error('Error in user registration:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};


const userLogin = async ( req , res ) => {
    try {
        const { email , password } = req.body 
        // Validate fields
        if ( !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({
                success: false,
                message: 'User not found. Please register first.'
            });
        }

        // Compare passwords
        const isPasswordValid = await user.isPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials.'
            });
        }

        const token = generateToken(user._id);

        // Remove sensitive data
        const safeUser = user.toObject();
        delete safeUser.password;


        return res.status(200).json({
            success: false ,
            message: 'User logged in successfully.', 
            user: safeUser , 
            token 
        })


    } catch (error) {
        console.log('error in login: ' , error) ; 
        return  res.status(500).json({
            success: false , 
            message: error.message || 'Internal server error.'
        })
        
    }
} ; 

const getUserDetail = async (req , res ) => {
    try {
        const user = {
            _id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email,
            avatarURL: req.user.avatarURL,
            createdAt: req.user.createdAt
        };
        return res.status(200).json({
            success : true , 
            message:'User details' , 
            user  , 
        })
    } catch (error) {
        console.log('error in User detail: ', error) ; 
        return res.status(500).json({
            succes: false , 
            message: error.message || 'Internal server error.'    
        })
    }
}

export { 
    registerUser ,
    userLogin , 
    getUserDetail
};
