import express from 'express'
import {loginController, logoutController, registerController, updateProfilePhotoController, updateUserController} from "../controllers/userController.js";
import { getUserProfileController } from '../controllers/userController.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';


//router object
const router = express.Router();

//routes

//register
router.post('/register',registerController)

//login
router.post('/login',loginController)


//profile
router.get('/profile',isAuth,getUserProfileController);


//logout
router.get('/logout',isAuth,logoutController);


//updateUser
router.put('/updateUser',isAuth,updateUserController);


//update profile pic
router.put('/updateProfilePic',isAuth,singleUpload,updateProfilePhotoController)

export default router;

