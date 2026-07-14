

const mongoose = require("mongoose")


function  ConnectTODb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {

            console.log("connected to database")
        })

    }


module.exports = ConnectTODb
