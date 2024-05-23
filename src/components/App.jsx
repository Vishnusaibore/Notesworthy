import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from "./Header"
import Footer from './Footer'
import Input from './Input'
import Notes from "./Notes"

function App(){
    const[notes,setNotes]=useState([])

    //Note Cretaion
     function addNote(newNote){
        // console.log(newNote) Here newNote is an object sent from Input page

        async function postData(currentNoteItem){
            const response = await axios.post('http://localhost:5000/api/notes',currentNoteItem)
            alert(response.data.message)
            fetchNotes(); //It wiil fetch the data after data inserted into database
        }
        
        if(newNote.title!==""){
            postData(newNote)
        }else{
            alert("!!! Note Title Should not be Empty. Please Try Again")
        }
        
     }

    //Get Data
    useEffect(() => {
        fetchNotes();
      }, []);

      const fetchNotes = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/notes');
          setNotes(response.data);
        } catch (error) {
          console.error('Error fetching notes:', error);
        }
      };
    
    //Delete Route
    function deleteNote(id){
        let url="http://localhost:5000/api/notes/"+id
        async function removeNote(){
            const response = await axios.delete(url)
            alert(response.data.message)
            fetchNotes(); //It will fetch data after deletion
        }
        removeNote() 
    }

    //Editing a Note
    function editNote(id,updatedNote){
        //For PUT Route
        async function updatesNote(ID,myNote){
            let uri="http://localhost:5000/api/notes/"+ID
           await axios.put(uri,myNote)
            fetchNotes()
        }
        //For PATCH Route
        async function updateNoteContent(ID,myNote){
            let uri="http://localhost:5000/api/notes/"+ID
            const resp = await axios.patch(uri,myNote)
           alert(resp.data.message)
            fetchNotes()
        }
        //Condition to call PUT or PATCH Routes
        if(updatedNote.title==="")
        {updateNoteContent(id,updatedNote) }
        else{ updatesNote(id,updatedNote) }  
    }
    return(
        <div>
        <Header />
        <Input 
            onAdd={addNote}
        />
        {notes.map(note=>(
            <Notes
            key={note._id}
            id={note._id}
            Title={note.title}
            Content={note.content}
            onDelete={deleteNote}
            onEdit={editNote}
            />
        ))}
        <Footer />
        </div>
    )
}
export default App