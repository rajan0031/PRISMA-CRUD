import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    try {
        const blog = await prisma.blog.create({
            data: {
                title,
                content,
                image,
                tags,
                author: {
                    connect: { id: author }, // Connect the author to the blog
                },
            },
        });
        console.log("A new blog is created:", blog);
        return blog;
    } catch (error) {
        console.error("Error creating blog:", error);
        throw new Error("Error creating blog");
    }
};

/**
 * fetchAllBlogs - Fetches all blog posts from the database.
 *
 * @async
 * @returns {object[]} - An array of all blog posts with author details.
 */
export const fetchAllBlogs = async () => {
    return await prisma.blog.findMany({
        include: {
            author: {
                select: { name: true, email: true },
            },
        },
    });
};

/**
 * fetchBlogById - Fetches a single blog post by its ID.
 *
 * @async
 * @param {string} id - The ID of the blog post to fetch.
 * @returns {object}  - The blog post with author details.
 * @throws {Error}    - Throws an error if the blog post is not found.
 */
export const fetchBlogById = async (id) => {
    const blog = await prisma.blog.findUnique({
        where: { id },
        include: {
            author: {
                select: { name: true, email: true },
            },
        },
    }); 

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
    let blog = await prisma.blog.findUnique({
        where: { id },
    });

    if (!blog) throw new Error("Blog not found");

    if (blog.authorId !== userId) throw new Error("Unauthorized");

    blog = await prisma.blog.update({
        where: { id },
        data: updatedData,
    });

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
    const blog = await prisma.blog.findUnique({
        where: { id },
    });

    if (!blog) throw new Error("Blog not found");

    const deletedBlog = await prisma.blog.delete({
        where: { id },
    });

    return deletedBlog;
};
