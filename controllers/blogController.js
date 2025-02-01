import { createNewBlog, fetchAllBlogs, fetchBlogById, updateBlogById, deleteBlogById } from "../services/blogService.js";
import { tryCatchHandler } from '../helpers/ErrorHandler.js';

/**
 * createBlog - It calls createNewBlog in blogService and creates a new blog
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the created blog, and successful message
 */
const createBlog = tryCatchHandler(async (req, res) => {
    const { title, content, image, tags } = req.body;
    const author = req.user.id;

    const blog = await createNewBlog(title, content, image, tags, author);

    res.status(201).json({ message: "Blog created successfully", blog });
});

/**
 * getAllBlogs - It calls fetchAllBlogs in blogService and fetches all blogs
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends all blogs from the database
 */
const getAllBlogs = tryCatchHandler(async (req, res) => {
    const blogs = await fetchAllBlogs();
    console.log("Here is the list of all the blogs:", blogs);
    res.status(200).json(blogs);
});

/**
 * getBlogById - It calls fetchBlogById in blogService and fetches a particular blog by its ID
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the retrieved blog from the database
 */
const getBlogById = tryCatchHandler(async (req, res) => {
    const id = req.params.id;
    console.log("The ID of the particular blog is:", id);

    const blog = await fetchBlogById(id);

    console.log(`This is the blog with ID ${id}`, blog);

    if (!blog) return new ErrorResponse(404, "Blog not found!");

    res.status(200).json(blog);
});

/**
 * updateBlog - It calls updateBlogById in blogService and updates a blog
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the updated blog in JSON format
 */
const updateBlog = tryCatchHandler(async (req, res) => {
    const { title, content, image, tags } = req.body;

    const blog = await updateBlogById(req.params.id, req.user.id, { title, content, image, tags });

    res.status(200).json({ message: "Blog updated successfully", blog });
});

/**
 * deleteBlog - It deletes the blog by its ID
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the message of successful deletion of the blog
 */
const deleteBlog = tryCatchHandler(async (req, res) => {
    const deletedBlogPost = await deleteBlogById(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });

    console.log("The deleted blog is:", deletedBlogPost);
});

/**
 * Exports all the blog-related functions.
 */
export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
