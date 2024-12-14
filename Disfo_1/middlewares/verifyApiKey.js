const verifyApiKey = (req, res, next) => {
    const { 'x-api-key': apiKey } = req.headers;

    if (apiKey === process.env.xApiKey) {
        return next();
    }

    return res.status(403).json({ error: 'Unauthorized access. Invalid API key.' });
}

module.exports = verifyApiKey;