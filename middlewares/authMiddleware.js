import jwt from 'jsonwebtoken';

/**
 * authMiddleware- this is the authentication middleware , it will ensures that the user is loggedin or not. 
 *
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @param {function} next - The next middleare function for error handling
 * 
 */

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        console.log("this is the decoded message ", decoded);
        req.user = decoded;
        console.log("this is the req.user", req.user);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;
