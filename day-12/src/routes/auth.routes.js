const express = require('express')
const authRouter =express.Router()
const jwt = require("jsonwebtoken")

const userModel = require("../models/user.model")


authRouter.post("/register", async(req , res)=>{
    const { email , name , password} = req.body

    const isUserAlreadyExists =  await  userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({
            message : " user already exists with this Email id"
        })
    }


    const user = await userModel.create({
        email ,password , name
    })

    const token = jwt.sign(
        {
           id:user._id,
           email:user.email
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

module.exports = authRouter