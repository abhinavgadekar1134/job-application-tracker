const jwt = require("jsonwebtoken");
const usermodel = require("../models/userModel")
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send("Token missing");

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded._id now exists
        const user = await usermodel.findById(decoded._id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user; // attach full user document
        next();
    } catch (e) {
        console.error(e);
        res.status(401).send("Invalid token");
    }
};

module.exports =authMiddleware