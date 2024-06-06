import express from 'express'
import {loginController, registerController} from "../controllers/userController.js";
import { getUserProfileController } from '../controllers/userController.js';


//router object
const router = express.Router();

//routes

//register
router.post('/register',registerController)

//login
router.post('/login',loginController)


//profile
router.get('/profile',getUserProfileController);

export default router;