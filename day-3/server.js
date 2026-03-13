const express = require('express')

const app = express()

app.use (express.json()) // Malwear hai , jo request.body ka data server pe read krne ke liye use hota hai
const notes = [] 


app.post("/notes",(req,res) =>{

    console.log(req.body)
    notes.push(req.body) // req.body se data milta hai jo client se aata hai , aur usko notes array me push kr diya jata hai
    res.send('Note created' ) //

}) 

app.get("/notes",(req,res) =>{
    res.send(notes)
})

 
app.listen(3000,() =>{
    console.log('Server is running on port 3000')
})