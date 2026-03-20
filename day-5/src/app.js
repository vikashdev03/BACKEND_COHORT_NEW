/* 2 kaam 
server ko creste kasrna
server ko start kasrna
 */


const express = require ('express')
const app = express()

app.use(express.json())  /* ye line isliye lagayi hai taki hum req.body se data le ske */
const notes =[]

app.post("/notes",(req,res)=>{

   
    notes.push(req.body)

    res.status(201).json({
        message : "note created Successfully"
    
    }) // status code ye batata hai ki outcome kya hua clint ke request ka 201 ka matlab hai ki resource create ho chuka hai

})


/* GET /notes */

app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes: Notes 
    })
})

/* DELETE /notes */

app.delete("/notes/:vikash",(req,res)=>{
    delete notes[req.params.vikash]
    res.status(200).json({
        message: "note deleted successfully"
    })

})

/* PATCH /notes/:vikash */
app.patch("/notes/:vikash",(req,res)=>{
    notes[req.params.vikash] = req.body
    res.status(200).json({
        message: "note updated successfully"
    })


})



module.exports = app 