const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Username is required"],
        unique:true
    }   ,
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true
    },
    password:{
        type:String,
        select:false,
        required:[true, "Password is required"],
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;