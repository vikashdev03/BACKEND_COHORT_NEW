const usermodel = require("../models/user.model");
const redis = require("../config/cache");

const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token Not Found"

        })
    }

    const isTokenBlacklisted = await redis.get(token);

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next(); // apna request ko agle controller function me bhej do

    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }

} 
module.exports = { authUser };