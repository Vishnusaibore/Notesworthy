import React,{useState} from "react";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Zoom from '@mui/material/Zoom';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from "@mui/material";

function Input(props){
    const[note,setNote]=useState({
        title:"",
        content:""
    })
    const[isExpanded,setExpanded] = useState(false)
    function handleZoom(){
        setExpanded(true)
    }
    function minimize(){setExpanded(false)}
    function handleChange(event){
        const{name,value}=event.target
        setNote(prevNote=>{
            return{
                ...prevNote,
                [name]:value
            }
        })
    }

    function submitNote(event){
        props.onAdd(note)
        event.preventDefault()
        setNote({
            title:"",
            content:""
        })
        setExpanded(false)
    }

    return(
        <div>
        <form className="create-note">
        {isExpanded &&(<Typography align="right">
        <button onClick={minimize} className="minimize-btn"><CloseIcon /></button>
        </Typography>)}
        {isExpanded && <input onChange={handleChange} name="title" placeholder="Title" value={note.title} />}
        <textarea onClick={handleZoom}  onChange={handleChange} name="content" placeholder="Take a Note" value={note.content} rows={isExpanded?3:1}/>
        <Zoom in={isExpanded}>
        <Typography align="right">
        <button onClick={submitNote} type="submit" className="publish-btn"><NoteAddIcon /></button>
        </Typography></Zoom>
        </form>
        </div>
    )
}
export default Input