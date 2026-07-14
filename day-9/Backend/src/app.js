const express = require("express")
const noteModel = require("./models/note.model")

const app = express()
app.use(express.json());

/* POST /api/notes
- Create new note and save data in mongodb
-  */
app.post('/api/notes', async (req , res)=>{
    const {title , description} = req.body
  const note =   await noteModel.create({
        title , description
    })

    res.status(201).json({
        message:"note created succesfully ",
        note
    })
})

/* 
--GET/api/notes
--fetch all the notes data from mongodb and send them in the response
*/
app.get("/api/notes", async(req , res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message :"Notes fetched Successfully ",
        notes
    })
})

/* 
-- DELETE /api/notes
-- Delete note with the id from req.params 
*/
app.delete('/api/notes/:id' , async (req ,res)=>{
    const id = req.params.id
     await noteModel.findByIdAndDelete(id)
     res.status(200).json({
        message: "Note Deleted SuccessFully.",
     })

})

/* 
--PATCH/api/notes
--Update the description pf the note 
  */
 app.patch('/api/notes/:id' , async (req ,res)=>{
    const id = req.params.id
    const {description}= req.body

    await noteModel.findByIdAndUpdate(id ,{ description})
    
    res.status(200).json({
        message: "Note updated wSuccessfully",
    })
    
 })

 
 module.exports = app

