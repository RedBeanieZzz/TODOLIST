import React, {Fragment, useState} from "react";
import './inputTodo.css';

const InputTodo = () =>{

    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message)
        }
    };

    
    return (
    <Fragment>
        <h1 className="title">To Do List</h1>
        <form className="form-input" onSubmit={onSubmitForm}>
            <input type="text" className="form-control" placeholder="Put something to do.." value={description} onChange={e => setDescription(e.target.value)}/>
            <button className="btn btn-input" placeholder="Put your tasks here..">ADD</button>
        </form>
    </Fragment>
    );
};

export default InputTodo;