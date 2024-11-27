const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    "title": String,
    "authors": [String],
    "content": String,
    "publishedAt": Date,
});

// General convention to use the capital B for the Blog and use singular form, Schema
const blogModel = mongoose.model("Blog", blogSchema, "blogs"); // Third argument is Collection is optinal. If not provided it will defaults to plural form of the model name. (blog(model) -> blogs)

module.exports = blogModel;


// - Learnings
/*
- .Schema() is like the constructor function called using new keyword.
-.model() is the mongoose function

*/