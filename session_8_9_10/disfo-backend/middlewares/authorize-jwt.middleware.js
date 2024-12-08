const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();
const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const authorize = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Getting the token from the Authorization [0] is bearer [1] is token
        // const result = AuthServiceInstance.verifyJwt(token); // The result is the Payload with userId, iat and exp so we will extract the userId from it.
        // console.log(result);
        const { userId } = AuthServiceInstance.verifyJwt(token);
        const user = await UserServiceInstance.findById(userId);
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.sendStatus(403).send({ message: "JWT Token Expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.sendStatus(403).send({ message: error.message });
        }
        res.sendStatus(401);
    }
}

module.exports = authorize;

// - Learnings
/*
- We are getting the userId from the Payload of the verifyJwt token.
-Then we are finding that user by his Id from the Users using user.service.js function findById we created.
- Once found we are attaching it to the request body so that the controller knows about the user.
*/