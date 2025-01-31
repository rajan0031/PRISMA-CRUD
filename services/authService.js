import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ErrorResponse } from '../helpers/ErrorResponse.js';

/**
 * registerUser - Register a new user in the database after checking if the email is already taken.
 * 
 * @async
 * @param {string} name       -The anme of the user 
 * @param {string} email      -the email of the user
 * @param {password} password -the plain text password of the user
 * @returns {object} newUser  -The newly created user object with the hashed password.
 */

export const registerUser = async (name, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ErrorResponse("User already exists in the database , you can either login , or try another email , for signup and all", 403);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return newUser;
};

/**
 * loginUser - this function will login the user 
 *
 * @async
 * @param {string} email      -this sis the email of the user 
 * @param {password} password -this is the passord of the user /plane password
 * @returns {string} token    -this is the token generated in this login function 
 */

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new ErrorResponse("User does not exist in the database");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorResponse("ValidationError", 401);

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "5m" });
    return token;
};

/**
 * clearToken - this the function which will logout the user 
 *
 * @param {string} token -this is parameter of logout function
 * @returns {boolean}    -this function will return true means logout 
 */

export const clearToken = (token) => {

    return true;
};

/**
 * getUserDataById   -this is teh function which will be get a user profile by its id 
 *
 * @async
 * @param {string} id         -this the id of the user which i wants to finds 
 * @returns {object} userData-this is the user data which have been retrived from the database 
 */

export const getUserDataById = async (id) => {

    try {

        const userData = await User.findOne({ _id: id });
        return userData;

    } catch (err) {
        console.log(err);
    }

}


