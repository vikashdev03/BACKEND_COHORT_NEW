const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email:{
        type : String,
        unique: [true , "with this email user Account Alreaddy exists"]
    },
    Password: String,
})

const userModel = mongoose.model("Users" , UserSchema)

module.exports = userModel