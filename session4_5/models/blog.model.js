const mongoose = require("mongoose");

// Session-5
// const blogSchema = new mongoose.Schema({
//     "title": String,
//     "authors": [String],
//     "content": String,
//     "publishedAt": Date,
// });

// Session-6 (The schema can be more specific and little complex)
const blogSchema = new mongoose.Schema({
    "title": { type: String, required: true, unique: true },
    "authors": { type: [String], default: [] },
    "content": { type: String, default: "" },
    "publishedAt": { type: Date, default: null },
}, {
    timestamps: true,
    versionKey: false, // To disable "__v" from the Documents
}
);

// General convention to use the capital B for the Blog and use singular form, Schema
const blogModel = mongoose.model("Blog", blogSchema, "blogs"); // Third argument is Collection is optinal. If not provided it will defaults to plural form of the model name. (blog(model) -> blogs)

module.exports = blogModel;


// - Learnings
/*
- .Schema() is like the constructor function called using new keyword.
-.model() is the mongoose function

- title is required and its unique. Two blogs with same title cannot exist

*/