const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/user.model');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');



authRouter.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const isUSerExist = await userModel.findOne({ email });


    if (isUSerExist) {
        return res.status(409).json({ message: "User already exists" });
    }


    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash("md5").update(password).digest("hex")
    })


    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' })


    res.cookie('token', token)

    res.status(201).json({
        message: "User created successfully"
        , user
        , token
    })

})

// ye get-me api karti ye hai ki token deckti hai  
authRouter.get('/get-me', async (req, res) => {

    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email,
    })

}) 

// for new token need to login again beacuse token is expired after 1 hour

authRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = crypto.createHash("md5").update(password).digest("hex") === user.password;

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token);

    res.json({
        message: "Login successful",
        token
    });

});

module.exports = authRouter;

