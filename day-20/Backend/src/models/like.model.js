const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: [true , " Post id is required"]
    },
    user: {
    type: String,
    required: [true, "Username is required"]
}
} ,{
    timestamps: true
})

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const LikeModel = mongoose.model("like" , likeSchema)

module.exports = LikeModel;
