import { useState } from 'react'
import heroImg from './assets/hero.png'
import axios from 'axios'



function App() {

  //yaha notes ek state variblae hai  = matlab notes variable  jo notes ko store karega array of object hoga jisme har object me ek note ka data hoga 
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description"
    },

    {
      title: "test title 2",
      description: "test description"
    },

    {
      title: "test title 3",
      description: "test description"
    },

    {
      title: "test title 4",
      description: "test description"
    },
  ])

    axios.get('http://localhost:3000/api/notes')
    .then((res)=>{
      console.log(res.data)
      setNotes(res.data.notes)
    })


  return (
    <>

      <div className="notes">
        {
          notes.map(note=> {
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