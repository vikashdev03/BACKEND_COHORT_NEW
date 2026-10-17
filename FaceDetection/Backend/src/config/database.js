const mongoose = require("mongoose");

function connectTODB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To FaceDetection Database")
    })
    .catch(err =>{
        console.log("Error Connecting to DB" , err)
    })
}


module.exports = connectTODB;