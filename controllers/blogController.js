import Blog from '../models/Blog.js';

import { createNewBlog, fetchAllBlogs, fetchBlogById, updateBlogById, deleteBlogById } from "../services/blogService.js";
import { ErrorResponse } from '../helpers/ErrorResponse.js';
import { tryCatchHandler } from '../helpers/ErrorHandler.js';

/**
 *createBlog-  it calls the createNewBlog in blogService and create a new blog 
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the created blog , and successfull message
 */

const createBlog = tryCatchHandler(async (req, res) => {

    const { title, content, image, tags } = req.body;
    const author = req.user.id;

    const blog = await createNewBlog(title, content, image, tags, author);


    res.status(201).json({ message: "Blog created successfully", blog });

});

/**
 *getAllBlogs-  it calls the fetchAllBlogs in blogService and fetch all blogs 
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the get all the blogs from the database 
 */

const getAllBlogs = tryCatchHandler(async (req, res) => {


    const blogs = await fetchAllBlogs();
    console.log("here is the list of the all the blogs we have ", blogs);
    res.status(200).json(blogs);

});

/**
 *getBlogById-  it calls the fetchBlogById in blogService and get a particular blog from the database
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the retrive the particular blog from the database 
 */

const getBlogById = tryCatchHandler(async (req, res) => {


    const id = req.params.id;
    console.log("the id of the particular blog is ", id);

    const blog = await fetchBlogById(id);

    console.log(`this is the blog with id 
             no ${req.params.id}`, blog);



    if (!blog) return new ErrorResponse(404, "blog not found!");

    res.status(200).json(blog);

});

/**
 *updateBlog-  it calls the updateBlogById in blogService and update a blog 
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the current updated blog in json object
 */

export const updateBlog = tryCatchHandler(async (req, res) => {
    const { title, content, image, tags } = req.body;

    const blog = await updateBlogById(req.params.id, req.user.id, { title, content, image, tags });

    res.status(200).json({ message: "Blog updated successfully", blog });
});

/**
 *deleteBlog- it delete the blog by its id 
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {void} Sends the message of the successfull deletion of the current blog 
 */

const deleteBlog = tryCatchHandler(async (req, res) => {

    const deletedBlogPost = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });

    console.log("the deleted blog is :", deletedBlogPost);

});

/**
 * Exports all the blog-related functions.
 */

export { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlog };
