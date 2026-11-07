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
            success: true,
            message: 'User logged in successfully.',
            user: safeUser,
            token
        })


    } catch (error) {
        console.error('Error in login:', error);
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
        console.error('Error in getUserDetail:', error);
        return res.status(500).json({
            succes: false,
            message: error.message || 'Internal server error.'    
        })
    }
}


const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullname, avatarURL } = req.body;

        // Validate that at least one field is provided
        if (fullname === undefined && avatarURL === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one field to update.'
            });
        }

        // Prepare update object
        const updateFields = {};

        if (fullname !== undefined) {
            if (typeof fullname !== 'string' || !fullname.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'Fullname cannot be empty.'
                });
            }

            updateFields.fullname = fullname.trim();
        }

        if (avatarURL !== undefined) {
            if (typeof avatarURL !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid avatar URL.'
                });
            }

            updateFields.avatarURL = avatarURL.trim();
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error in update profile:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

const deleteUserProfile = async ( req , res) => {
    try {
        const userId = req.user._id ; 

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully.',
            user: deletedUser
        })
        
    } catch (error) {
        console.error('Error in deleteUserProfile:', error);

        return res.status(500).json({
            success: false , 
            message: error.message || 'internal server error.'
        })
        
    }
}

const logOutUser = async (req , res ) => {
    try {
        return res.status(200).json({
            success: true , 
            message: 'User logged out successfully.'
        })
    } catch (error) {
        console.error('Error in logOutUser:', error);

        return res.status(500).json({
            success: false , 
            message: error.message || 'internal server error.'
        })
    }
} 



export { 
    registerUser ,
    userLogin , 
    getUserDetail , 
    updateUserProfile , 
    deleteUserProfile , 
    logOutUser
};
