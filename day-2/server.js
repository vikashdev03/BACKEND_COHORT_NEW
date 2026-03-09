const express = require('express')
const app = express() //server ki instance kocrete kr diya // instance create karna matlab server appke request ko kaise accept karega aur response kaise dega

app.get('/', (req, res) => { 
    res.send('Hello World') 
})  
 
app.get('/about', (req, res) => { 
    res.send('This is about page') 
})

app.get('/home', (req, res) => {
    res.send('This is home page')
})

app.listen(3000) // server start krna 