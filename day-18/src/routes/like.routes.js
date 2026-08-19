const express = require("express")
const LikeRouter = express.Router()
const identifyUser = require("../middlewares/auth.middleware")
const controllers = require("../controllers/like.controller")


/*
 * POST http://localhost:3000/api/like/likePost/:postId
 */
LikeRouter.post("/likePost/:postId", identifyUser, controllers.likePostController)


/*
 * POST http://localhost:3000/api/like/unlikePost/:postId
 */
LikeRouter.post("/unlikePost/:postId", identifyUser, controllers.UnlikePostController)

module.exports = LikeRouter;
