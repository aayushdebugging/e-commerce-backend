import express from 'express'
import {loginController, logoutController, registerController, updateUserController} from "../controllers/userController.js";
import { getUserProfileController } from '../controllers/userController.js';
import { isAuth } from '../middlewares/authMiddleware.js';


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

export default router;