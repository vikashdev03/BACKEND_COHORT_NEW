import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      Description: "description test",
    },
    {
      title: "test title 2",
      Description: "description test",
    },
    {
      title: "test title 3",
      Description: "description test",
    },

    {
      title: "test title 4",
      Description: "description test",
    },
  ]);

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    console.log(res.data);
  })

  
  return (
    <>
      <div className="notes">
       {
        notes.map(note=>{
          return <div className="note">
            <h1>{note.title}</h1>
            <p>{note.Description}</p>
          </div>
        })
       }
      </div>
    </>
  );
}

export default App;
