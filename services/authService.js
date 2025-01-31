import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


import { ErrorResponse } from '../helpers/ErrorResponse.js';




export const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ErrorResponse("User already exists in the database , you can either login , or try another email , for signup and all", 403);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return newUser;
};




export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new ErrorResponse("User does not exist in the database");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorResponse("ValidationError", 401);

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1m" });
    return token;
};



// start of the logout functionality


export const clearToken = (token) => {

    return true; // true return kar rahe hai matlab logout karna hai bhai 
};


// end of the logout functionality 