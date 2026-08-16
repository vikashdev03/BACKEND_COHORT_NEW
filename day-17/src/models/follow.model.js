const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "followee is required"]
    }
}, {
    timestamps: true
    })

const followModel = mongoose.model("Follow", followSchema)

module.exports = followModel