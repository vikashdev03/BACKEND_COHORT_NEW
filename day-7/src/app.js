/* 
1. server create krna 
2. Server ko config karna 
 */

const express = require("express")
const noteModel = require("./models/notes.model")

const app = express()
app.use(express.json())// middleware for req.body



/* POSt  
    - req.body => {title , description}*/
app.post("/notes", async (req, res)=>{
    const {title , description , age} = req.body
    const note = await noteModel.create({
        title , description , age
    }) 
     // IN MUMBAI Me   noteModel.create() => jis  title aur description ko humne req.body se destructure kiya hai usko noteModel ke create method me pass kar diya hai , aur ye method hume ek promise return karega , jisme hum then method ka use karke response bhej sakte hai 
    res.status(201).json ({
        message : "note created successfully",
        note
    })
     


})


/* GET /notes */


module.exports = app