const User = require("../models/users.model");

const registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).send(newUser);
    } catch (error) {
        // We need to think of all the Cases here.
        if (error.name === "ValidationError") {
            return res.status(400).send({ message: error.message });
        }
        if (error.code === 11000) {
            res.status(409).json({
                message: "Failed to create new user",
                reason: "Already Exists in DB",
            });
        }
        res.status(500).send({ message: "Something went wrong!", error });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            // No users found
            return res.status(404).json({ message: 'No Users found' });
        }
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: `Something went wrong! Please Try again`, error });
    }
}

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: `User not found! ${username}` });
        }

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: `Something went wrong! Please Try again`, error });
    }
}

module.exports = { registerUser, getAllUsers, getUserByUsername };