import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { registerUser, loginUser, getUserDataById } from '../services/authService.js';
import { ErrorResponse } from '../helpers/ErrorResponse.js';
import { SuccessResponse } from '../helpers/SuccessResponse.js';
import { tryCatchHandler } from '../helpers/ErrorHandler.js';

/**
 * register- a new user in the database.
 * @param {object} req - The HTTP request object containing user details.
 * @param {object} res - The HTTP response object used to send the response.
 * @returns {void} Sends a JSON response with the registration status and user data.
 */

export const register = tryCatchHandler(async (req, res) => {


	const { name, email, password } = req.body;
	const user = await registerUser(name, email, password);
	console.log(user);
	res.status(201).json({ message: "User registered successfully", user });

});

/**
 * login-its calls the login function for the handling the users logins and all
 *
 * @module {object} the HTTP request object
 * @module {object} the HTTP response object
 * @module {object} the next middleware function for error handling
 * @returns{void}   sends a response with token 
 * 
 */

export const login = tryCatchHandler(async (req, res, next) => {

	const { email, password } = req.body;
	const token = await loginUser(email, password);
	if (!token) {
		return next(new ErrorResponse("INVALID EMAIL OR PASSWORD", 401));
	}
	console.log(token);
	res.status(200).json({ message: "Login successful", token });

});

/**
 * logout-its calls the logout in authService to perform the logout operations
 *
 * @module {object} req - The HTTP request object 
 * @module {object} res - The HTTP response object 
 * @returns{void}   res	- sends a response message for logout user
 * 
 */

export const logout = tryCatchHandler(async (req, res) => {

	res.clearCookie('token');
	console.log("logout is successfull");
	res.status(200).json({ message: 'Logout successful. Token cleared.' });
});

/**
 *viewProfile-  Fetches and returns the user's profile data.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the user's profile data in response.
 */

export const viewProfile = async (req, res) => {
	console.log("user profile is viewed uer profile controller is viewed ");
	const id = req.params.id;
	console.log(id);

	const userData = await getUserDataById(id);
	console.log(userData);
	res.status(200).json({ userData: userData });
}
