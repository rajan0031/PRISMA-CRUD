import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser, getUserDataById } from '../services/authService.js';
import { ErrorResponse } from '../helpers/ErrorResponse.js';
import { SuccessResponse } from '../helpers/SuccessResponse.js';
import { tryCatchHandler } from '../helpers/ErrorHandler.js';

/**
 * Register a new user in the database.
 * @param {object} req - The HTTP request object containing user details.
 * @param {object} res - The HTTP response object used to send the response.
 * @returns {void} Sends a JSON response with the registration status and user data.
 */
export const register = tryCatchHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const user = await registerUser(name, email, password);
	res.status(201).json(new SuccessResponse('User registered successfully', user));
});

/**
 * Handle user login.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function for error handling.
 * @returns {void} Sends a response with the JWT token.
 */
export const login = tryCatchHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const token = await loginUser(email, password);
	if (!token) {
		return next(new ErrorResponse('Invalid email or password', 401));
	}
	res.status(200).json(new SuccessResponse('Login successful', { token }));
});

/**
 * Handle user logout.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends a response message for logout.
 */
export const logout = tryCatchHandler(async (req, res) => {
	res.clearCookie('token');
	res.status(200).json(new SuccessResponse('Logout successful. Token cleared.'));
});

/**
 * Fetch and return the user's profile data.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the user's profile data in response.
 */
export const viewProfile = tryCatchHandler(async (req, res) => {
	const id = req.params.id;
	const userData = await getUserDataById(id);
	res.status(200).json(new SuccessResponse('User profile fetched successfully', userData));
});