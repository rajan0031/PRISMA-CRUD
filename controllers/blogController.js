import Blog from '../models/Blog.js';

import { createNewBlog, fetchAllBlogs, fetchBlogById, updateBlogById, deleteBlogById } from "../services/blogService.js";
import { ErrorResponse } from '../helpers/ErrorResponse.js';
import { tryCatchHandler } from '../helpers/ErrorHandler.js';


// start of the creating the blog 

const createBlog = tryCatchHandler(async (req, res) => {

    const { title, content, image, tags } = req.body;
    const author = req.user.id;

    const blog = await createNewBlog(title, content, image, tags, author);


    res.status(201).json({ message: "Blog created successfully", blog });

});

const getAllBlogs = tryCatchHandler(async (req, res) => {


    const blogs = await fetchAllBlogs();
    console.log("here is the list of the all the blogs we have ", blogs);
    res.status(200).json(blogs);

});


// end of the  of the creating the blog 



// start of the getBlogById starts here 

const getBlogById = tryCatchHandler(async (req, res) => {


    const id = req.params.id;
    console.log("the id of the particular blog is ", id);

    const blog = await fetchBlogById(id);

    console.log(`this is the blog with id 
             no ${req.params.id}`, blog);



    if (!blog) return new ErrorResponse(404, "blog not found!");

    res.status(200).json(blog);

});


// end  of the getBlogById starts here 




// start  of the  of the updateBlog starts here 

export const updateBlog = tryCatchHandler(async (req, res) => {
    const { title, content, image, tags } = req.body;

    const blog = await updateBlogById(req.params.id, req.user.id, { title, content, image, tags });

    res.status(200).json({ message: "Blog updated successfully", blog });
});



// end   of the  of the updateBlog starts here 



// strat of teh blog deleteion  starts from here 





const deleteBlog = tryCatchHandler(async (req, res) => {

    const deletedBlogPost = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });

    console.log("the deleted blog is :", deletedBlogPost);

});


// end of teh  of teh blog deleteion  starts from here 




// exporting all the functions from here and i will use them in the routes file cod e

export { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlog };
