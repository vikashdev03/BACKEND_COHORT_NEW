const express = require('express')
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

  

/* 
* POST http://localhost:3000/api/post/createpost [ protected jsike pass token hai Wohi acces kr srkta hai ]
* - req.body  = ( caption , imageFile
*/
postRouter.post("/createpost" , upload.single("image"),identifyUser, postController.CreatePostController)


/** 
 * GET http://localhost:3000/api/post/allUserPost [protected]
 */
postRouter.get("/allUserPost", identifyUser  ,postController.getAllUserPostController)


/*
 * GET http://localhost:3000/api/post/OnePostDetails/:Postid
 * - return an detail about specific post with the id . also check wheather the post 
 * 
 * belongs to the user that the request come from 
 */
postRouter.get("/OnePostDetails/:postId" , identifyUser , postController.getOnePostDetailsController)


module.exports = postRouter 
 