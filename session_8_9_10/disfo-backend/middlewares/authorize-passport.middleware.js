const passport = require("passport");
const JwtStrategy = require("../config/passport");

passport.use(JwtStrategy);

module.exports = passport.authenticate("jwt", { session: false });