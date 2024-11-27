const Blog = require("../models/blog.model")

// Creating the new Blog is done with the below function.
// - http://localhost:8082/blogs/new
const createNewBlog = async (req, res) => {
    // console.log("request came here");
    // console.log(req.body);

    try {
        const newBlog = new Blog(req.body); // Creating the blog
        await newBlog.save(); // Saving the blog

        // - One more way to do the above (.create() knowledge - Mongoose Docs)
        // const newBlog = await Blog.create(req.body);

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
        res.send(await Blog.find());
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
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { returnDocument: 'after' }); // 'after' returns updated document
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
        await Blog.findByIdAndDelete(blogId);
        res.sendStatus(204); // When we want to send the success status code but do not want to send the Body we use 204 Status code
        // res.status(204).send({ message: `Blog was deleted Successfully` });
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(422).send({ message: "Invalid BlogId!" });
        }

        res.status(500).send({ message: "Something went wrong! Please Try again", error });
    }
}

module.exports = { createNewBlog, getBlogs, getBlogById, updateBlogById, deleteBlogById };



// - Learnings
/*
- Whenever we have async/await we need to use try catch block.

- 400 -> Bad Request
- 409 -> Conflict

- .find() and .findById()

- MongoDB only allows Hexadecimal Id's [0-9,A-F], Other characters if present Invalid ID

- { returnDocument: 'before' } shows us the previous value which was present in the document when the request will be made
- { returnDocument: 'after' } shows us the updated value which was updated presently.
*/