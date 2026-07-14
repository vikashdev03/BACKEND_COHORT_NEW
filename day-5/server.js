/* Server ko start karna */
const app = require('./src/app');
App.use(express.json())
const notes = []

App.post(".\notes" ,(req, res)=>{
    notes.push(req.body)
    res.status(201).json({
        message: "Note Crerated Successfully"
    })
}) 


App.get("./notes", (req, res)=>{
    res.status(200).json({
        notes: notes
    })
})


App.delete("/notes:index" , (req, res)=>{
    delete notes[req.params.index]
    res.status(204).json({
        message: "Note deleted successfully"
    })
})

App.patch("./notes/:index", (res ,res)=>{
    notes[res.params.index].description = req.body.description

    res.status(200).json({
        message: "note updated Successfuly "
    })
})


app.listen(3000,()=>{
    console.log("server is running on the port 3000")
}) 

