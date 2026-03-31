/* 
1. server start karna 
2. server ko database se connect karna 
 */
require("dotenv").config() 
const app = require("./src/app")
const mongoose = require("mongoose")
const ConnectTODb = require("./src/config/database")


ConnectTODb() 

app.listen(3000, ()=> {
    console.log("server is runnning on the port 3000")
    
})

