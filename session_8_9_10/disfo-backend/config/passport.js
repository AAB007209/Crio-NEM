const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
};

// JwtStrategy constructor takes two parameters: options and callback function
// The callback takes two parameters: payload and done.
// Payload -> This is the same payload we encrypted in the jwt.
// done -> Another callback function to be executed after verification.
const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await UserServiceInstance.findById(payload.userId);
        return done(null, user); // passing user object to the controller using done
    } catch (error) {
        return done(error, false);
    }
});

module.exports = strategy;