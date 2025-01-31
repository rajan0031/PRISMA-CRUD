import mongoose from 'mongoose';

/**
 * Mongoose schema for the User Model.
 * 
 * This schema defines the structure of the user name , email, password , and the timestamps. 
 * 
 *
 * @typedef {Object} userSchema     - this is the User schema for the user registrations 
 * @property {string} name          - The title of the name of the user.
 * @property {string} email         - The content of the email of the user.
 * @property {string} password      - The image link of the password of the user.
 * 
 */

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
