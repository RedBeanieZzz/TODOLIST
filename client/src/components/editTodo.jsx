import React, {Fragment, useState} from "react";

const EditTodos = ({todo}) => {
    const [description, setDescription] = useState(todo.description);

    //update data function
    const updateData = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{ 
            method: "PUT",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(body)
            });
            window.location = "/";

        } catch (err) {
            console.error(err.message)
        }
    };

    return (
        <Fragment>
            <button 
                type="button" 
                class="btn btn-warning" 
                data-bs-toggle="modal" 
                data-bs-target={`#id${todo.todo_id}`}>
            Edit
            </button>
            <div 
                class="modal fade" 
                id={`id${todo.todo_id}`} 
                tabindex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true"
                onClick={() => setDescription(todo.description)}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit To Do</h1>
                            <button 
                                type="button" 
                                class="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                                onClick={()=> setDescription(todo.description)}>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="text"
                                className="form-control" 
                                value={description} 
                                onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div class="modal-footer">
                            <button 
                                type="button"
                                class="btn btn-danger" 
                                data-bs-dismiss="modal" 
                                onClick={() => setDescription(todo.description)}>
                                Close
                            </button>
                            <button 
                                type="button" 
                                class="btn btn-success"
                                onClick={e => updateData(e)}>
                            Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default EditTodos;