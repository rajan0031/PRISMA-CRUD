import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { registerUser, loginUser } from '../services/authService.js';
import { ErrorResponse } from '../helpers/ErrorResponse.js';
import { SuccessResponse } from '../helpers/SuccessResponse.js';

import { tryCatchHandler } from '../helpers/ErrorHandler.js';


export const register = tryCatchHandler(async (req, res) => {


    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    console.log(user);
    res.status(201).json({ message: "User registered successfully", user });

});
 


export const login = tryCatchHandler(async (req, res, next) => {

    const { email, password } = req.body;
    const token = await loginUser(email, password);
    if (!token) {
        return next(new ErrorResponse("INVALID EMAIL OR PASSWORD", 401));
    }
    console.log(token);
    res.status(200).json({ message: "Login successful", token });

});


//  start of the logout system 

export const logout = tryCatchHandler(async (req, res) => {

    res.clearCookie('token');
    console.log("logout is successfull");
    res.status(200).json({ message: 'Logout successful. Token cleared.' });
});




// end of the logout system 