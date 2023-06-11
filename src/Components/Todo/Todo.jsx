import React, { useEffect, useState } from 'react';
import './todo.css';
import uuid from 'react-uuid';
import { useLocalStorage } from '../../Helpers/useLocalStorage';

export const Todo = ({disabled}) => {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useLocalStorage("newTask", "");
    const [editing, setEditing] = useState(null);
    const [updatingTask, setUpdatingTask] = useLocalStorage("updatingTask", "");
    const [showInput, setShowInput] = useState(false);

    const handleNewTaskChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleCreateTask = (event) => {
        event.preventDefault();
        const createdTask = {
            id: uuid(),
            name: newTask,
            completed: false
        };

        setTasks([...tasks, createdTask]);
        setNewTask("");
    };

    const handleDeleteTask = (deletedTask) => {
        setTasks(tasks.filter(task => task.id !== deletedTask.id));
    };

    const handleEditTask = (editedTask) => {
        setEditing(editedTask);
        setUpdatingTask(editedTask.name);
    };

    const handleTaskEditingChange = (event) => {
        setUpdatingTask(event.target.value);
    };

    const handleUpdatingTask = (event) => {
        event.preventDefault();

        const updatedTask = tasks.map(task => {
            if(task.id === editing.id){
                return {
                    ...task,
                    name: updatingTask
                };
            };
            return task;
        });

        setTasks(updatedTask);
        setEditing(null);
        setUpdatingTask("");
    };

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleCompleted = (task) => {
        const updatedTask = tasks.map((t) => {
            if (t.id === task.id){
                return {
                    ...t,
                    completed: !t.completed
                };
            };
            return t;
        });
        setTasks(updatedTask);
    };


    useEffect(() => {
        const allTasks = JSON.parse(localStorage.getItem("tasks"));
        if(allTasks){
            setTasks(allTasks);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className='btn-group dropup text-light mt-4'>
            {disabled && <> <button type="button" className="btn btn-transparent border border-0 bg-transparent text-light" data-bs-toggle="dropdown" aria-expanded="false">
                Todo
            </button> 
            <ul className="dropdown-menu bg-dark" style={{width: 320, height: 251.4}}>
                <div className='d-flex justify-content-center align-items-center mt-3'>
                    <h4 className='text-light' style={{textDecoration: 'underline'}}>ToDo List</h4>
                </div>
                {tasks.length == 0? (<div className='d-block justify-content-center align-items-center text-center mt-2'>
                        <p className='text-light mb-1'>Add a todo to get started</p>
                        <p className='text-secondary'>One step at time...</p>
                        {showInput? (<form className='d-flex justify-content-between' onSubmit={handleCreateTask}>
                            <input type='text' placeholder='New todo' value={newTask} onChange={handleNewTaskChange} id='inputCreateFirst' required />
                            </form>) : (<button style={{backgroundColor: '#40A253', borderRadius: 20, width: 116, height: 40}} id='buttonTodo' onClick={handleButtonClick}>New Todo</button>)
                        }
                    </div>) : (<ul>
                    {tasks.map((task, i) => (<li key={task.id} className='d-flex justify-content-between'>
                        {editing === task? (<form onSubmit={handleUpdatingTask} className='d-flex justify-content-between'>
                            <input type='text' value={updatingTask} onChange={handleTaskEditingChange} autoFocus id='inputEdit' required />
                            <button className='btn btn-transparent text-light' type='submit'>
                                <i className="bi bi-check2-square"></i>
                            </button>
                            <button className='btn btn-transparent text-light' onClick={() => setEditing(null)}>
                                <i className="bi bi-x-square"></i>
                            </button>
                        </form>) : (<div className='d-flex justify-content-between' id='divTasks'>
                            <input className="form-check-input" type="checkbox" value="" id="checkboxTodo" checked={task.completed} onChange={() => handleCompleted(task)} required />
                            <p className={task.completed? "completed" : "no_completed"}>{task.name}</p>
                            <div className='d-flex justify-content-between' id='divButtons'>
                                <button onClick={() => handleEditTask(task)} className='btn btn-transparent text-light'>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className='btn btn-transparent text-light' onClick={() => handleDeleteTask(task)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>)}
                    </li>))}
                    <form onSubmit={handleCreateTask}>
                        <input type='text' placeholder='New todo' value={newTask} onChange={handleNewTaskChange} id='inputCreateSecond' required />
                    </form>
                </ul>)}
            </ul>
            </>}
        </div>
    )
}
