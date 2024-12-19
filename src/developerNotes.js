import React from "react";

function DeveloperNotes(props) {

    return(
        <div>
            <h2>{props.devNote.title}</h2>
            <p>{props.devNote.date}</p>
            <p>{props.devNote.author}</p>
            <p>{props.devNote.text}</p>
        </div>
    )
}

export default DeveloperNotes;