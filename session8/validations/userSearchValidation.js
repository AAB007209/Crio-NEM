const Joi = require("joi");
const { validGenders } = require("../config/config")

const userSearchSchema = Joi.object({
    gender: Joi.string().valid(...validGenders),
    age: Joi.number().min(0).max(100),
}).or("gender", "age");

module.exports = { userSearchSchema };





// - Points to be noted:
// Google in case of doubt (For Joi validation methods): I have an object and I want atleast one of the values to be present. (.or method)