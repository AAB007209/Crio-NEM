const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "fullname": { type: String, default: "", maxLength: 25 },
    "username": { type: [String], required: true, unique: true, maxLength: 50 },
    "email": {
        type: [String],
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    }
}, {
    timestamps: true,
    versionKey: false, // To disable "__v" from the Documents
}
);

const userModel = mongoose.model("User", userSchema, "users");

module.exports = userModel;