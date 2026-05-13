import { useState } from 'react'
import heroImg from './assets/hero.png'
import axios from 'axios'



function App() {

  //yaha notes ek state variblae hai  = matlab notes variable  jo notes ko store karega array of object hoga jisme har object me ek note ka data hoga 
  const [notes, setNotes] = useState([])

  axios.get("http://localhost:3000/api/notes")
    .then(res => {
      setNotes(res.data.notes) // res.data.notes me humne backend se jo data aya hai usme se notes ko access kiya hai aur usko setNotes me store kar diya hai
    })




  return (
    <>
      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App


// React Me API ko call karne ke liye hum axios package ka use karte hai