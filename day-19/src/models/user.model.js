
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: [true , "user  name already exists"],
        required: [true, "username is required"]
    },
    email: {
        type:String,
        unique:[true, "email Already Exists"],
        required: [true, "email is required"]
    }, 
    password: {
        type: String,
        required:[true , "password is required"]
    },

    bio :String,
    profilePicture: {
        type: String,
        default:"https://ik.imagekit.io/tai57l8rz/1777312127437.jpg?updatedAt=1786002039735"
    }
     

})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel;