const Joi = require('joi');

// Define the user validation schema
const userValidationSchema = Joi.object({
    fullname: Joi.string().max(25).optional().allow(''), // Optional with a max length of 25
    username: Joi.string().max(50).required(), // Required with a max length of 50
    email: Joi.string().email().required(), // Must be a valid email
});

module.exports = userValidationSchema;