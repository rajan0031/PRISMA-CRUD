import jwt from 'jsonwebtoken';

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

        // this is the decoded message  {
        //     id: '679ba034b6cde421f17a1d78',
        //     email: 'test@example.com',
        //     iat: 1738259357,
        //     exp: 1738262957
        //   }
        //   this is the req.user {
        //     id: '679ba034b6cde421f17a1d78',
        //     email: 'test@example.com',
        //     iat: 1738259357,
        //     exp: 1738262957
        //   }

        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;
