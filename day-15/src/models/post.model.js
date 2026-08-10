const mongoose = require('mongoose');


 const PostSchema= new mongoose.Schema({

    caption:{
            type : String,
            default:"",
        },
        img_url:{
            type: String,
            require: [true , " image is compulsory for creating a post"]
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "",
            require:[true , "user id is required for creaating a post"]
        }
 })

 const postModel = mongoose.model("posts" , PostSchema)

 module.exports = postModel
