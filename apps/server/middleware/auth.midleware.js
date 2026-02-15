import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protect = async (req, res, next) =>{
    let token;

    
    if(req.cookies && req.cookies.token){
        token = req.cookies.token;
    }
    
    if(!token){
        return res.status(401).json({
            message: 'Not Authenticated to perform this action'
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id);
        
        if(!user){
            return res.status(401).json({
                message: "User doesn't exist"
            });
        }
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not authenticated, token failed",
            error: error.message,
            stack: error.stack
        });
    }
}