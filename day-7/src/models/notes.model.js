


const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title: String,
    description : String,
})

const noteModel = mongoose.model("notes", notesSchema) // ye line ek model create kr deti hai , aur "notes" collection ke ndar sare notes ka data store kr deti hai  

module.exports = noteModel 