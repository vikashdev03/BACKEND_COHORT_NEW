/* 
1. server start karna 
2. server ko database se connect karna 
 */
// require("dotenv").config() 
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);


require("dotenv").config()
const app = require("./src/app")
const mongoose = require("mongoose")
const ConnectTODb = require("./src/config/database")


ConnectTODb() 

app.listen(3000, ()=> {
    console.log("server is runnning on the port 3000")
    
})

