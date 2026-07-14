/* Server ko start karna
database se connect karna
 */
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require('dotenv').config()
const app = require("./src/app")
const ConnecToDB = require("./src/config/database")

ConnecToDB()

app.listen(3000,()=>{
    console.log("server is running on the port")
})
