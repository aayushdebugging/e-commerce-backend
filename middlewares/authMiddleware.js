import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';
export const isAuth = async(req,res,next)=>{
    const {token} = req.cookies
    //validation
    if(!token){
        return res.status(401).json({error:"Unauthorized" })
    }
    const decodeData = JWT.verify(token , process.env.SECRET_KEY);
    req.user = await userModel.findById(decodeData._id);
    next();
};