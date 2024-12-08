const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../models/user.model");

class AuthService {
    signup = async (payload) => User.create({ ...payload, password: await this.generatePasswordHash(payload.password) }); // This will return a Promise
    generatePasswordHash = (password) => bcrypt.hash(password, 10);

    // For comparing password
    comparePassword = (plainTextPassword, hashedPassword) => bcrypt.compare(plainTextPassword, hashedPassword); // This function also returns promise but resolved as either true or false
    generateJwt = (payload) => Jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1m" });

    verifyJwt = (token) => Jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = AuthService;

// - Learnings
/*
generateJwt accepts 3 paramters -> Payload, Secret Key, Options (expiresIn, etc)

JwtVerify(token, SecretKey);

*/