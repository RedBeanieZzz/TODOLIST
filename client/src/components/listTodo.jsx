import React, {Fragment, useEffect, useState} from "react";
import EditTodos from "./editTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    //delete function 
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message)
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
    <Fragment>
        <table class="table mt-5 text-center">
            <thead>
            <tr>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
            </thead>
            <tbody>
                {/* <tr>
                
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr> */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <th scope="row">{todo.description}</th>
                        <td>
                            <EditTodos todo={todo} />
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
    );
};

export default ListTodos;