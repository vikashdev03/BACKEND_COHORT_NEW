


const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title: String,
    description : String,
    age : String
})

//database me kuch v karne k liye appko model ki jarurat parti hai 
//mongoose.model()
const noteModel = mongoose.model("notes", notesSchema) // ye line ek model create kr deti hai , aur "notes" collection ke ndar sare notes ka data store kr deti hai  

module.exports = noteModel  