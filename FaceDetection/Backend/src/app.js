const express = require("express");
const cookiesParser = require("cookie-parser");


const app = express();
app.use(express.json());
app.use(cookiesParser());

/*
 * Routes 
 */
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

module.exports = app