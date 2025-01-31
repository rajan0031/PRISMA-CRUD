import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './helpers/ErrorHandler.js';
import authMiddleware from './middlewares/authMiddleware.js';


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//     serverSelectionTimeoutMS: 10000,
//     socketTimeoutMS: 45000,
// })
//     .then(() => console.log(" Database connected successfully!"))
//     .catch((err) => console.error("Error connecting to database:", err));

// database connection start 
connectDB();
// database connection ends 
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);


// global middleware , error dectections 
app.use(authMiddleware);

// Global Error Handler (Last Middleware)
app.use(errorHandler);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

