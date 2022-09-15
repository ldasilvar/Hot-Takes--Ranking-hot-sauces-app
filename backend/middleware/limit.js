const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    max: 300,
    windowMs: 5 * 60 * 1000,
    message: "Too many request from this IP"
});

module.exports = limiter;