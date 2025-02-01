import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { ErrorResponse } from '../helpers/ErrorResponse.js';

const prisma = new PrismaClient();

/**
 * Register a new user in the database after checking if the email is already taken.
 * @async
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The plain text password of the user.
 * @returns {object} newUser - The newly created user object with the hashed password.
 */
export const registerUser = async (name, email, password) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new ErrorResponse('User already exists. Please login or use another email.', 403);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    return newUser;
};

/**
 * Log in the user and generate a JWT token.
 * @async
 * @param {string} email - The email of the user.
 * @param {string} password - The plain text password of the user.
 * @returns {string} token - The JWT token generated for the user.
 */
export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new ErrorResponse('User does not exist.', 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorResponse('Invalid email or password.', 401);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '5m' });
    return token;
};

/**
 * Fetch user data by ID.
 * @async
 * @param {string} id - The ID of the user.
 * @returns {object} userData - The user data retrieved from the database.
 */
export const getUserDataById = async (id) => {
    const userData = await prisma.user.findUnique({ where: { id } });
    if (!userData) throw new ErrorResponse('User not found.', 404);
    return userData;
};