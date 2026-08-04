const express = require('express')
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const crypto = require("crypto");

const userModel = require("../models/user.model")


/* 
* /api/auth/register
*/
authRouter.post("/register", async (req, res) => {

    const { email, name, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: " user already exists with this Email id"
        })
    }


    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        email, password:hash, name
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            password:user.password
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "user registered",
        user,
        token
    })


})

/* 
/api/auth/protected
 */
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);

    res.status(200).json({
        message: "this is a protected Route"
    })
})


/* 
/api/auth/login    ---------- // controller=  jab api hit hoga to ye function call hoga 
 */
authRouter.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User  not found with This Email address"

        })
    }

    const isPassWordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if (!isPassWordMatched) {
        return res.status(401).json({
            message: "invalid Password"
        })
    }


    const token = jwt.sign({
            id: user._id,
        },process.env.JWT_SECRET)

        res.cookie("jwt_token", token) // ye token ko set karte hai res.cookie ke andar  

        res.status(200).json({
            message:"user Logged In Sucessfully",
            user,
            
        })
    


})















module.exports = authRouter