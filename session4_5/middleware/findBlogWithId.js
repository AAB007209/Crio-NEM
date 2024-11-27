const Blog = require("../models/blog.model");

const findBlogWithId = async (req, res, next) => {
    const { blogId } = req.params;
    try {
        const reqBlog = await Blog.findById(blogId);

        if (!reqBlog) {
            return res.status(404).send({ message: `Blog with id: ${blogId} could not be found!` });
        }
        req.blog = reqBlog; // Attaching the found blog to the req key called "blog"
        next();
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(422).send({ message: "Invalid BlogId!" });
        }
        res.status(500).send({ message: `Something went wrong! Please Try again`, error });
    }
};

module.exports = findBlogWithId;