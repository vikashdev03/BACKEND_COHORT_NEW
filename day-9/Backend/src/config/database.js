const mongoose = require("mongoose")

function ConnecToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("donnected to database ");
        
    })

}

module.exports = ConnecToDB