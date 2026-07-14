/* App.js ka kaam--
1. Searver create karna (logic) 
2. server ko config karna 
*/

const express = require("express")
const App = express() /*  Server create ho jata hai  */

App.use(express.json())
const notes = []


App.post(".\notes" ,(req, res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.send("Note Create ho chuka hai ")
}) 


App.get("./notes", (req, res)=>{
    res.send(notes )
})


App.delete("/notes:index" , (req, res)=>{
    // console.log(req.parmas)
    delete notes[req.params.index]
    res.send("Note delete ho gaya ")
})
  
/* PATCH /notes/:index */
/* req.body = {description :- "Sample Modified Description"} */
App.patch("./notes/:index", (res ,res)=>{
    notes[res.params.index].description = req.body.description

    res.send("note successfully Updated")
})






module.exports = App