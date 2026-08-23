const LikeModel = require("../models/like.model")


async function likePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const isAlreadyExist = await LikeModel.findOne({
        post: postId,
        user: username
    })

    if (isAlreadyExist) {
        return res.status(400).json({
            message: "You have already liked the post"
        })
    }

    const like = await LikeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })
}


async function UnlikePostController(req, res) {

    const username = req.user.username
    const postId = req.params.postId

    const isAlreadyExist = await LikeModel.findOne({
        post: postId,
        user: username
    })

    if (!isAlreadyExist) {
        return res.status(400).json({
            message: "You have not liked this post"
        })
    }

    await LikeModel.findOneAndDelete({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post unliked successfully."
    })
}


module.exports = {
    likePostController,
    UnlikePostController
}