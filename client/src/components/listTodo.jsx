import React, {Fragment, useEffect, useState} from "react";
import EditTodos from "./editTodo";
import './listTodo.css'

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
        <table class="table ">
            <thead>
            <tr>
                <th>Check</th>
                <th scope="col">Things to do:</th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td><input type="checkbox" class="checkbox"/></td>
                        <th scope="row">{todo.description}</th>
                        <td>
                            <EditTodos todo={todo} />
                        </td>
                        <td>
                            <button type="button" class="btn danger" data-bs-toggle="alert" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    </Fragment>
    );
};

export default ListTodos;