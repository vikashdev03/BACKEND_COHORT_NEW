/* 
 - server ko start karna 
 - server ko database se connect karna
*/
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const app = require('./src/app');
const mongoose = require("mongoose")

function connectTODb(){
    mongoose.connect("mongodb+srv://VikashKumar:r13Pys86lxXhJWK5@cluster0.gf5nouh.mongodb.net/day-6").then(()=>{
        console.log("connected To Database");
    })
}

connectTODb()


app.listen(3000,()=>{
console.log("server is runnning on the port 3000")
})