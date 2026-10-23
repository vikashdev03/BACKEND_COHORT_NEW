const Redis = require("ioredis").default


const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

redis.on("connect", () => {
    console.log("Server is Connected TO Redis")
})

redis.on("error", (err) => { // agar redis me koi error aata hai to ye error ko console me print kar do
    console.log("Redis Error", err)
})

module.exports = redis;