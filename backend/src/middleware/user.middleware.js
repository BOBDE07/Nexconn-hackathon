import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.js';

const userMiddleware = async (req, res, next) => {
    try {
        // Get authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authentication token is required.'
            });
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find authenticated user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found.'
            });
        }
        
        // Attach user to request
        req.user = user;

        // Continue request
        next();

    } catch (error) {
        console.error('Error in user middleware:', error);

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.'
        });
    }
};

export default userMiddleware;
