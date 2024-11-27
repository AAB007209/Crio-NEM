const Blog = require("../models/blog.model")

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
        res.status(500).send({ message: "Something went wrong!", error });
    }
}

module.exports = { createNewBlog };



// - Learnings
/*
- Whenever we have async/await we need to use try catch block.

*/