const postModel = require("../models/post.model")
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const { Folders } = require("@imagekit/nodejs/resources.js")
const jwt = require("jsonwebtoken")

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function CreatePostController(req, res) {

    console.log(req.body, req.file)

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token Not provided , Unauthorized access"
        })
    }

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "User Not Authorished hai "
        })
    }

    console.log(decoded)
    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'fileTest',
        folder: "Cohort-2-instaClone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgurl: file.url,
        user:decoded.id
    })
    
    res.status(201).json({
        message:"Post created SuccessFully.",
        post
    })

}

module.exports = {
    CreatePostController
}
