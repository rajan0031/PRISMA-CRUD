import Blog from '../models/Blog.js';
import { ErrorResponse } from '../helpers/ErrorResponse.js';

export const createNewBlog = async (title, content, image, tags, author) => {
    const blog = new Blog({ title, content, image, tags, author });
    console.log("a new  blog is created ", blog);
    await blog.save();
    return await Blog.create({ title, content, image, tags, author });
};

export const fetchAllBlogs = async () => {
    return await Blog.find().populate("author", "name email");
};

export const fetchBlogById = async (id) => {
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) throw new Error("Blog not found");
    return blog;
};



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



export const deleteBlogById = async (id) => {



    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id)
        // return res.status(403).json({ message: "Unauthorized" });
        return new ErrorResponse(403, "Unauthorized, you are not allowed to delete the blog only blog admin have access to this ");

    console.log("below is the blog i am going to delete ");

  

};
