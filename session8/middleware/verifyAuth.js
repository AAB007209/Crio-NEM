const verifyAuth = (req, res, next) => {
    // console.log("Middleware reached on Auth");
    if (req.headers.authorization !== process.env.PASSWORD) {
        return res.sendStatus(401);
    }
    next();
}

module.exports = verifyAuth;