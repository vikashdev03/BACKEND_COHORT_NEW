import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([

  ])


  function fetchNotes() {
    axios.get("https://backend-cohort-new-2.onrender.com/api/notes")
      .then(res => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])


  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    console.log(title.value, description.value)

    axios.post("https://backend-cohort-new-2.onrender.com/api/notes", {
      title: title.value,
      description: description.value
    }).then(res => {
      console.log(res.data)
      fetchNotes()
    })
  }


  function handleDeleteNote(noteId) {

    axios.delete("https://backend-cohort-new-2.onrender.com/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()

      })


  }



  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder="Enter Title" />
        <input name='description' type="text" placeholder="Enter Description" />
        <button>Create note</button>
      </form>

      <div className="notes">
        {
          notes.map(note => {
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => { handleDeleteNote(note._id) }}>Delete</button>
            </div>
          })
        }
      </div>
    </>
  );
}

export default App;
