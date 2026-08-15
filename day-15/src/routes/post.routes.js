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



module.exports = postRouter 
 