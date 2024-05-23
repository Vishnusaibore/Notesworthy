import React,{useState} from "react";
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MinimizeIcon from '@mui/icons-material/Minimize';

function Notes(props){
    //For Handling Edit State is Active or Not
    const[isActive,setActive]=useState(false)
    function handleActive(){
        setActive(true)
    }
    //For Minimizing Edit Icon
    function handleMinimize(){
        setActive(false)
    }
    //For Handling Notes Editing or Updation
    const[note,setNote]=useState({
        title:"",
        content:""
    })

    function handleChange(event){
        const{name,value}=event.target
        setNote(prevNote=>{
            return{
                ...prevNote,
                [name]:value
            }
        })
    }

    function handleEdit(event){
        let ID=props.id
        props.onEdit(ID,note)
        event.preventDefault()
        setNote({
            title:"",
            content:""
        })
        setActive(false)
    }
    //It will Handle Note Deletion
    function handleClick(){
        let Id=props.id
        props.onDelete(Id)
    }
    return(
        <div className="note">
            <Fab onClick={handleActive}><EditNoteIcon /></Fab>
            <form className={isActive?"editNoteForm":null}>
            {isActive && (<input onChange={handleChange} name="title" placeholder="Title" value={note.title} />)}
            {isActive &&(<textarea onChange={handleChange} name="content" placeholder="Edit Here..." value={note.content} rows="3"/>)}
            {isActive &&(<Fab onClick={handleEdit} type="submit"><SendIcon /></Fab>)}
            {isActive &&(<Fab onClick={handleMinimize}><MinimizeIcon /></Fab>)}
            </form>

            {/* The below code handles Notes displaying & Deletion */}
            <h1>{props.Title}</h1>
            <p>{props.Content}</p>
            <Fab onClick={handleClick} type="submit"><DeleteIcon /></Fab>
        </div>
    )
}
export default Notes