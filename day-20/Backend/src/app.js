const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

//Required Routes
const authRouter = require("./routes/auth.routes")
const postRouter = require('./routes/post.routes')
const userRouter = require('./routes/user.routes')
const LikeRouter = require('./routes/like.routes')


// Using Routes
app.use("/api/auth", authRouter)
app.use("/api/post" , postRouter)
app.use("/api/user" , userRouter)
app.use("/api/like" ,LikeRouter )

module.exports = app;

/*
 * 
 */