import mongoose from 'mongoose';
/**
 * Mongoose schema for the Blog Model.
 * 
 * This schema defines the structure of the blog post , including its title ,contents ,associated image ,tags,author reference , and timestamps.
 * 
 *
 * @typedef {Object} BlogSchema - this is the blog schema for the blog creation 
 * @property {string} title     - The title of the blog
 * @property {string} content   - The content of the blog 
 * @property {string} image     - The image link of the blog 
 * @property {string} tags      - The tags related to the blog 
 * @property {string} author    - The author of the blog 
 * 
 */

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        default: []
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
