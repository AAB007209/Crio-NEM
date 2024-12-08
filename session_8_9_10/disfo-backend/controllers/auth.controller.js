const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();
const userService = require("../services/user.service");
const userServiceInstance = new userService();

const postSignup = async (req, res) => {
    try {
        const newUser = await AuthServiceInstance.signup(req.body);
        res.status(201).send(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).send({ message: `User with this email already exists!` });
        }
        req.status(500).send({ message: `Failed to sign user up!` });
    }
};
const postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const reqUser = await userServiceInstance.findByUsername(username);
        if (!reqUser) {
            return res.status(404).send({ message: `User with username: ${username} could not found!` });
        }
        const isLoggedIn = await AuthServiceInstance.comparePassword(password, reqUser.password);
        if (!isLoggedIn) {
            res.status(401).send({ isLoggedIn });
        }
        res
            .cookie(
                'remember-user-token',
                AuthServiceInstance.generateJwt({ userId: reqUser._id }),
                { httpOnly: true, maxAge: 1 * 60 * 1000 } // we can also write: "expires: new Date()" in place of maxAge.
            )
            .send({ isLoggedIn });
    } catch (error) {
        res.status(500).send({ message: `Failed to login: Try again!` });
    }
};

module.exports = { postSignup, postLogin };


// - Learnings
/*
- Because the auth service returns a promise here in controller we need to handle it in try-catch block always. Also async-await
- user.service.js already has the findUsername function which we will use here to find the user if exists in the DB before comparing the passwords.

- JWT Token
-> The idea is to generate a Token when the user logs in.

- npm i jsonwebtoken - https://www.npmjs.com/package/jsonwebtoken
- Once the user is logged in we generate a Token for him
    * res.send({ isLoggedIn, token: AuthServiceInstance.generateJwt({ userId: reqUser._id }) });

-> We modified the above res.send like below one. 
- res.cookie('remember-user-token', AuthServiceInstance.generateJwt({ userId: reqUser._id })).send({ isLoggedIn });

-> The Cookie should also expire when the Token expires.
*/