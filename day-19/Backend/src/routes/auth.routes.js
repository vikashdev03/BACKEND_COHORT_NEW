const express = require('express')
const authController = require("../controllers/auth.controller")


const authRouter = express.Router()

/**
 * POST http://localhost:3000/api/auth/register
 */
authRouter.post('/register', authController.registerController)


/**
 * POST http://localhost:3000/api/auth/login
 */
authRouter.post("/login", authController.loginController)

module.exports = authRouter