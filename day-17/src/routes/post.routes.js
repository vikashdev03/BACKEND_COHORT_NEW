const express = require('express')
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
  

/* 
* POST /api/posts [ protected jsike pass token hai Wohi acces kr srkta hai ]
* - req.body  = ( caption , imageFile
*/
postRouter.post("/" , upload.single("image"), postController.CreatePostController)


/** 
 * GET /api/posts/ [protected]
 */
postRouter.get("/", postController.getPostController)


/*
 * GET /api/posts/details/:Postid
 * - return an detail cbout specific post with the id . also check wheather the post 
 * 
 * belongs to the user that the request come from 
 */
postRouter.get("/details/:postId" , postController.getPostDetailsController)


module.exports = postRouter 
 