const rateLimit = require("express-rate-limit");

//Limits the actions on the website from any one IP to 400 every five minutes to protect website against brute attacks
const limiter = rateLimit({
    max: 600,
    windowMs: 5 * 60 * 1000,
    message: "Too many request from this IP"
});

module.exports = limiter;