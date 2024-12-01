const Blog = require("../models/blog.model");

class BlogService {
    create = async (payload) => Blog.create(payload);
    // const create = async (payload) => {
    //     const newBlog = new Blog(req.body); // Creating the blog
    //     await newBlog.save(); // Saving the blog
    //     return newBlog;
    //     // - One more way to do the above (.create() knowledge - Mongoose Docs)
    //     // const newBlog = await Blog.create(req.body);
    // };

    getAll = () => Blog.find();

    getById = (blogId) => Blog.findById(blogId);

    updateById = (blogId, payload) => Blog.findByIdAndUpdate(blogId, payload, { returnDocument: 'after' }); // 'after' returns updated document

    deleteById = (blogId) => Blog.findByIdAndDelete(blogId);

    searchByTitleOrAuthor = (title, author) => {
        const titleQuery = { title: { $regex: new RegExp(title, "i") } };
        const authorQuery = { authors: { $elemMatch: { email: author } } };

        if (title && author) {
            // ----- For Finding Author using Email ($elemMatch used) ------ 
            return Blog.find({ $and: [titleQuery, authorQuery] }); // - used $and so that both should be present
        }
        else if (title) {
            return Blog.find(titleQuery);
        }
        else if (author) {
            return Blog.find(authorQuery);
        }
        else {
            // Throw an error or handle the invalid input case
            return Promise.reject(new Error('Either "title" or "author" must be provided.'));
        }
    }
}

module.exports = BlogService;


/*
- If we change to some other framework tommorrow but this file doesn't need to change.

*/