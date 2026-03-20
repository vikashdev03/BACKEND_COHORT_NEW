/* 
 SERVER.JA KA KAAM HAI 
1. Server ko Start karna
2. Database se connect Karna 

 */

const app = require('./src/app')
const mongoose = require("mongoose")

function connecTODb (){
    mongoose.connect("mongodb+srv://vikashdeveloper79_db_user:EzrvdX3h1g3wO2PA@cluster0.xmlty9p.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to Database")
    })
}
  
connecTODb()

app.listen(3000,()=>{
    console.log("server is running on the port 3000")
    console.log
})




