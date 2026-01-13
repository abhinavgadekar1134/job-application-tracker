const mongoose = require('mongoose')
const usermodel = require('../models/userModel')
mongoose.pluralize(null);
const jwt = require("jsonwebtoken");

const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await usermodel.findOne({ userName });

        if (!user) {
            return res.status(401).send("Invalid username or password");
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send("Invalid username or password");
        }
        const token = jwt.sign(
            { id: user._id, role: user.role },process.env.JWT_SECRET,{ expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });

    } catch (e) {
        res.status(500).send("Server error");
    }
};

module.exports = { login }