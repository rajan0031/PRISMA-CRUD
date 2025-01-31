import express from 'express';
import { register, login, logout, viewProfile } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);// register system route 
router.post('/login', login); // login system route 
router.post('/logout', logout); // logout system route 
router.get("/viewprofile/:id", authMiddleware, viewProfile);


export default router;
