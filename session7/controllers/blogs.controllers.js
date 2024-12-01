// const Blog = require("../models/blog.model"); // Should not be used here. Used in Service Layer
const BlogService = require("../services/blogs.service")
// Creating a BlogService Instance (Object) to use the methods from it.
const BlogServiceInstance = new BlogService();

// Creating the new Blog is done with the below function.
// - http://localhost:8082/blogs/new
const createNewBlog = async (req, res) => {
    // console.log("request came here");
    // console.log(req.body);

    try {
        const newBlog = await BlogServiceInstance.create(req.body);
        res.status(201).send(newBlog); // Sending back the response
    } catch (error) {
        // We need to think of all the Cases here.
        if (error.name === "ValidationError") {
            return res.status(400).send({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).send({ message: `A Blog with this title already exists!` });
        }
        res.status(500).send({ message: "Something went wrong!", error });
    }
}

// Reading the Blogs is done in the below function
// - http://localhost:8082/blogs
const getBlogs = async (req, res) => {
    // Refer Mongoose docs here

    try {
        res.send(await BlogServiceInstance.getAll());
    } catch (error) {
        res.status(500).send({ message: `Something went wrong! Please Try again`, error });
    }
}

// Reading the Blog with Id is done in the below function
// - http://localhost:8082/blogs/67476a69e9739df6b9d18f49
const getBlogById = async (req, res) => {
    // Everything which was present here before is in Middleware and is already done before it comes here now using next() in middleware.
    // We are just sending the blog which we found in middleware
    res.send(req.blog);
}

// Updating the Blog with Id is done in the below function
// - http://localhost:8082/blogs/674725cf2192878e94ebd88b
const updateBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const updatedBlog = await BlogServiceInstance.updateById(blogId, req.body);
        res.status(200).send(updatedBlog);
    } catch (error) {
        res.status(500).send({ message: "Something went wrong! Please Try again", error });
    }
};

// Deleting the Blog with Id is done in the below function
// - http://localhost:8082/blogs/67476a69e9739df6b9d18f49
const deleteBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        await BlogServiceInstance.deleteById(blogId);
        res.sendStatus(204); // When we want to send the success status code but do not want to send the Body we use 204 Status code
        // res.status(204).send({ message: `Blog was deleted Successfully` });
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(422).send({ message: "Invalid BlogId!" });
        }

        res.status(500).send({ message: "Something went wrong! Please Try again", error });
    }
}

// - GET http://localhost:8082/blogs/search?title="AWS%20Blog-11%20with%20Terry"
// - GET http://localhost:8082/blogs/search?author=johnterry@afc.co.in
// const searchBlogs = async (req, res) => {

//     const { title, author } = req.query;

//     // - 3 Ways of Searching for title
//     // ----- Creating a Regular Expression (RegExp) for title
//     // const titleRegex = new RegExp(title, "i"); // i -> case insensitive regex
//     // res.send(await Blog.find({ title: titleRegex }));

//     // 2. One more way to do the same as above using MongoDB $regex
//     // res.send(await Blog.find({ title: { $regex: new RegExp(title, "i") } }));
//     // 3. or
//     // res.send(await Blog.find({ title: { $regex: new RegExp(title), $options: "i" } }));

//     const titleQuery = { title: { $regex: new RegExp(title, "i") } };
//     const authorQuery = { authors: { $elemMatch: { email: author } } };

//     try {
//         if (title && author) {
//             // ----- For Finding Author using Email ($elemMatch used) ------ 
//             return res.send(await Blog.find({ $and: [titleQuery, authorQuery] })); // - used $and so that both should be present
//         }
//         else if (title) {
//             return res.send(await Blog.find(titleQuery));
//         }
//         else if (author) {
//             return res.send(await Blog.find(authorQuery));
//         }
//         else {
//             res.status(400).send({ message: `One of the "title" or "author" must be passed` });
//         }

//     } catch (error) {
//         res.status(500).send({ message: "Something went wrong! Please Try again", error });
//     }
// }

// This below function uses Service layer
const searchBlogs = async (req, res) => {

    const { title, author } = req.query;

    try {
        const result = await BlogServiceInstance.searchByTitleOrAuthor(title, author);
        if (!result) {
            return res.status(400).send({ message: `One of the "title" or "author" must be passed` });
        }
        res.status(200).send(result);
    } catch (error) {
        if (error.message.includes('Either "title" or "author" must be provided')) {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "Something went wrong! Please Try again", error });
    }
}

module.exports = { createNewBlog, getBlogs, getBlogById, updateBlogById, deleteBlogById, searchBlogs };



// - Learnings
/*
- Whenever we have async/await we need to use try catch block.

- 400 -> Bad Request
- 409 -> Conflict

- .find() and .findById()

- MongoDB only allows Hexadecimal Id's [0-9,A-F], Other characters if present Invalid ID

- { returnDocument: 'before' } shows us the previous value which was present in the document when the request will be made
- { returnDocument: 'after' } shows us the updated value which was updated presently.

// - Extra Session 1 (Session 6)
1. GET http://localhost:8082/blogs/search

2. GET http://localhost:8082/blogs/search?title="AWS%20Blog-11%20with%20Terry"

3. GET http://localhost:8082/blogs/search?author="johnterry@afc.co.in"

4. GET http://localhost:8082/blogs/search?title="AWS%20Blog-11%20with%20Terry"&author="johnterry@afc.co.in"

encodeURIComponent("AWS Blog-11 with Terry")
-> 'AWS%20Blog-11%20with%20Terry'

// - http://localhost:8082/blogs/search?title=Vivek%20Nigam (For all the blogs from Vivek Nigam)
// - http://localhost:8082/blogs/search?title=Nigam (Same)
// - http://localhost:8082/blogs/search?title=vivek (Same)
- We made use of Regular Expression (Standard JS, not any package) which contains any one of the keyword from the title and case insensitive

// - Session 7
- We are not supposed to write the Business logic in the controllers. It should just receive the request and send the response.


*/