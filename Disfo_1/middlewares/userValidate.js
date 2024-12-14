const userValidationSchema = require("../validations/users.validations");

// Middleware to validate the request body using the schema
const validateUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: 'Validation failed',
            details: error.details.map((detail) => detail.message),
        });
    }

    next(); // Proceed to the next middleware or route handler if validation passes (Succeded)
};

module.exports = {
    validateUser,
};
