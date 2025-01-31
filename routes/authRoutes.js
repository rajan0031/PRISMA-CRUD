import express from 'express';
import { register, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);// register system route 
router.post('/login', login); // login system route 
router.post('/logout', logout); // logout system route 


export default router;
