
/* app.js file  ka kaam
 - server create karna 
 - server ko config karna 

   */

const express = require('express');

const app = express(); /* server create ho chuka hai  */
app.use(express.json()) /* express.json() middleware ko use kar diya  */


const notes = [] // ye notes array hai jisme hum notes ko store karenge

/* POST/notes */
app.post("/notes", (req, res) => {
    console.log(req.body) /* request body ko console pe print kar diya  */
    res.send("note received") /* response bhej diya  */
    notes.push(req.body) /* request body ko notes array me push kar diya  */
    console.log(notes) /* notes array ko console pe print kar diya  */
})

/*
ismke humne kya kiya ki jab bhi koi client /notes endpoint pe POST request bhejega to hum us request body ko console pe print karenge, usko notes array me store karenge aur client ko "note received" response bhejenge.
*/


/* GET /notes */
app.get("/notes", (req, res) => {
    res.send(notes) /* notes array ko client ko bhej diya postman me  */
})

module.exports = app /* app ko export kar diya  */

/* DELETE/notes */
/* params => request.params use karte hai small values ko client sidese server side access karne ke liye krte hai  */

/*delete /notes/0 */

/* isme 0 index pe jo note hai usko delete karna hai  */

app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index] /* request.params.index ko console pe print kar diya  */
    res.send("note deleted successfully") /* client ko "note deleted" response bhej diya  */
})

/* PATCH /notes/:index */
/* req.body = {contain description:- "sample modified description. "} */
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description /* request.params.index ko console pe print kar diya  */
    res.send("note updated successfully") /* client ko "note updated" response bhej diya  */
})