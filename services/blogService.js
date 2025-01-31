import Blog from '../models/Blog.js';
import { ErrorResponse } from '../helpers/ErrorResponse.js';

/**
 * createNewBlog - Creates a new blog post in the database.
 *
 * @async
 * @param {string} title   - The title of the blog post.
 * @param {string} content - The content of the blog post.
 * @param {string} image   - The image URL associated with the blog post.
 * @param {string[]} tags  - An array of tags for the blog post.
 * @param {string} author  - The ID of the author who created the blog post.
 * @returns {object}       - The newly created blog post.
 */
export const createNewBlog = async (title, content, image, tags, author) => {
    const blog = new Blog({ title, content, image, tags, author });
    console.log("A new blog is created:", blog);
    await blog.save();
    return await Blog.create({ title, content, image, tags, author });
};

/**
 * fetchAllBlogs - Fetches all blog posts from the database.
 *
 * @async
 * @returns {object[]} - An array of all blog posts, with author details populated.
 */
export const fetchAllBlogs = async () => {
    return await Blog.find().populate("author", "name email");
};

/**
 * fetchBlogById - Fetches a single blog post by its ID.
 *
 * @async
 * @param {string} id - The ID of the blog post to fetch.
 * @returns {object}  - The blog post with author details populated.
 * @throws {Error}    - Throws an error if the blog post is not found.
 */
export const fetchBlogById = async (id) => {
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) throw new Error("Blog not found");
    return blog;
};

/**
 * updateBlogById - Updates a blog post by its ID.
 *
 * @async
 * @param {string} id          - The ID of the blog post to update.
 * @param {string} userId      - The ID of the user attempting to update the blog post.
 * @param {object} updatedData - An object containing the updated fields for the blog post.
 * @returns {object}           - The updated blog post.
 * @throws {Error}             - Throws an error if the blog post is not found or the user is unauthorized.
 */
export const updateBlogById = async (id, userId, updatedData) => {
    let blog = await Blog.findById(id);

    if (!blog) {
        throw new Error("Blog not found");
    }

    if (blog.author.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    blog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    if (!blog) {
        throw new Error("Blog update failed");
    }

    return blog;
};

/**
 * deleteBlogById - Deletes a blog post by its ID.
 *
 * @async
 * @param {string} id - The ID of the blog post to delete.
 * @returns {object}  - The deleted blog post.
 * @throws {Error}    - Throws an error if the blog post is not found or the user is unauthorized.
 */
export const deleteBlogById = async (id) => {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id) {
        return new ErrorResponse(403, "Unauthorized, you are not allowed to delete the blog. Only the blog admin has access to this.");
    }

    console.log("Below is the blog I am going to delete:", blog);
};


