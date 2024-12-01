const mongoose = require("mongoose");
const validator = require("validator");

const { blackListedDomains } = require("../config/config");

// Session-5
// const blogSchema = new mongoose.Schema({
//     "title": String,
//     "authors": [String],
//     "content": String,
//     "publishedAt": Date,
// });

// The Authors array can be more verbose so defining a Schema for Authors.
const authorSchema = new mongoose.Schema({
    fullName: { type: String, default: "", maxLength: 50 },
    email: {
        type: String,
        required: true,
        maxLength: 50,
        validate: {
            validator: (value) => validator.isEmail(value, { host_blacklist: blackListedDomains }),
            message: (props) => {
                if (blackListedDomains.includes(props.value.toLowerCase().split("@")[1])) {
                    return `Personal emails are not allowed: Please use a business email.`;
                }
                return `${props.value} is not a valid email address`;
            }
        }
    },
    twitterHandle: { type: String, default: "" },
    image: {
        type: String,
        default: "https://www.iconpacks.net/free-icon/user-3296.html",
        validate: {
            validator: (value) => validator.isURL(value, { protocols: ['https'] }), // Only allowing https protocols
            message: (props) => `${props.value} is not a valid https URL`,
        }
    },
    // resume: {
    //     type: String,
    //     validate: {
    //         validator: (value) => value.split(".").at(-1) === "pdf",
    //         message: (props) => `${props.value} must be a valid pdf`
    //     },
    // },
}, {
    _id: false, // To disable ID field inside of authors
});

// Session-6 (The schema can be more specific and little complex)
const blogSchema = new mongoose.Schema({
    "title": { type: String, required: true, unique: true },
    "authors": { type: [authorSchema], default: [] },
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

- We can disable _id for the Authors but if we disable it for the Document blogSchema then we encounter error. Because MongoDB document needs to have an _id field.

- Validation works for this. Gives Email validation error
{
    "title": "AWS Blog-9 with Terry",
    "authors": [
        {
            "fullName": "John Terry",
            "email": "johnterry.cfc.co.uk",
            "twitterHandle": "@_johnterry_"
        }
    ], 
    "content": "Very good Blog for AWS", 
    "publishedAt": null 
}

Output
{
    "message": "Blog validation failed: authors.0.email: ${props.value} is not a valid email address"
}

- blackListedDomains in Config file. Check if the email is not among these values and then display messages or return accordingly.

- Same kind of Validation for the Image URL using .isURL(). Below I have sent the http in the Image URL
{
    "title": "AWS Blog-11 with Terry",
    "authors": [
        {
            "fullName": "John Terry",
            "email": "johnterry@afc.co.in",
            "twitterHandle": "@_johnterry_",
            "image": "http://www.iconpacks.net/free-icon/user-3296.html"
        }
    ], 
    "content": "Very good Blog for AWS", 
    "publishedAt": null 
}

----- ERROR -----
{
    "message": "Blog validation failed: authors.0.image: http://www.iconpacks.net/free-icon/user-3296.html is not a valid https URL"
}

- Let's say we want some extension validations and the package doesn't contain any validation for this
- We can create our own validation like below
    resume: {
        type: String,
        validate: {
            validator: (value) => value.split(".").at(-1) === "pdf",
            message: (props) => `${props.value} must be a valid pdf`
        },
    },

- Below is the Testing
{
    "title": "AWS Blog-11 with Terry",
    "authors": [
        {
            "fullName": "John Terry",
            "email": "johnterry@afc.co.in",
            "twitterHandle": "@_johnterry_",
            "image": "https://www.iconpacks.net/free-icon/user-3296.html",
            "resume": "john.doc"
        }
    ], 
    "content": "Very good Blog for AWS", 
    "publishedAt": null 
}
----- ERROR -----
{
    "message": "Blog validation failed: authors.0.resume: john.doc must be a valid pdf"
}

*/