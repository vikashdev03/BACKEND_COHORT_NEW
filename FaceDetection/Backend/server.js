require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const app = require("./src/app")
const connectTODb = require("./src/config/database")

connectTODb();
app.listen(3000,() =>{
    console.log("Server is Running on the Port 3000");

} )