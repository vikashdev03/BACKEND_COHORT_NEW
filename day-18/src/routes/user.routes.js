
const express = require('express');
const UserController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")
const userRouter = express.Router();
    
// creating a API :userid = jis user ko follow karna chahte hai 

/*
 * POST http://localhost:3000/api/user/follow/:username
 */
userRouter.post("/follow/:username" , identifyUser , UserController.followUserController)

/*
 * POSt http://localhost:3000/api/user/unfollow/username
 */
userRouter.post("/unfollow/:username" ,identifyUser, UserController.UnfollowUserCrontroller)





module.exports = userRouter;