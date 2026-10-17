const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [{ email }, { username }]
    });

    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "User already registered"
        })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ username, email, password: hash });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" })

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User Registered Successfully",

        user: { id: user._id, username: user.username, email: user.email }
    })
}


async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne(
        {
            $or: [{ email }, { username }]
        }
    );

    if (!user) {
        return res.status(400).json(
            { message: "Invalid credentials" }
        )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json(
            { message: "Invalid credentials" }
        );
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: "4d" }

    )

    res.cookie("jwt_token", token)
}


module.exports = { registerUser, loginUser }