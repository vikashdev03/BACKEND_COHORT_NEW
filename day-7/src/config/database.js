

const mongoose = require("mongoose")


function ConnectTODb() {
    mongoose.connect("process.env.MONGO_URL")
        .then(() => {

            console.log("connected to database")
        })
}


module.exports = ConnectTODb
