const postModel = require("../models/post.model")
const Imagekit = require('@imagekit/nodejs/index.js')
const { toFile } = require('@imagekit/nodejs/index.js')
// const { Folders } = require("@imagekit/nodejs/resources.js")
const jwt = require("jsonwebtoken")

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function CreatePostController(req, res) {

    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: 'fileTest',
        folder: "Cohort-2-instaClone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgurl: file.url,
        user: req.user.id // phale tha decoded.id but ab req.user.id hai kyuki middleware me req.user me decoded store kr diya hai
    })

    res.status(201).json({
        message: "Post created SuccessFully.",
        post
    })

}

async function getAllUserPostController(req, res) {

  
    const userId = req.user.id // phale decoded.id tha 

    const posts = await postModel.find({
        user: userId
    })

    res.status(200)
        .json({
            message: "Posts fetched successfully.",
            posts
        })

}

async function getOnePostDetailsController(req, res) {

  
    const userId  = req.user.id // phale decoded.id tha
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched  successfully",
        post
    })
    

}



module.exports = {
    CreatePostController ,
    getAllUserPostController,
    getOnePostDetailsController
}
