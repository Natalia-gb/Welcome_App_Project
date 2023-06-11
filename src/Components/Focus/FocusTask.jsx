import React, { useEffect, useState } from 'react';
import './focus.css';
import { useLocalStorage } from '../../Helpers/useLocalStorage';
import uuid from 'react-uuid';

export const FocusTask = ({disabled}) => {

    const [taskList, setTaskList] = useState([]);
    const [updatingFocus, setUpdatingFocus] = useLocalStorage('updatingFocus', '');
    const [newTask, setNewTask] = useLocalStorage("newFocus", "");
    const [editing, setEditing] = useState(null);
    const [checked, setChecked] = useLocalStorage("focusCompleted", false);

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    };

    const handleDeleteTask = (deletedFocus) => {
        setTaskList(taskList.filter(focus => focus.id !== deletedFocus.id));
    };

    const handleCreateFocus = (event) => {
        event.preventDefault();
        const focus = {
            id: uuid(),
            title: newTask,
            completed: false
        };

        setTaskList([...taskList, focus]);
        setNewTask("");
    };

    const handleEditFocus = (editedFocus) => {
        setEditing(editedFocus);
        setUpdatingFocus(editedFocus.title);
    };

    const handleUpdateFocus = (event) => {
        event.preventDefault();
        const updatedFocus = taskList.map(focus => {
            if(focus.id === editing.id){
                return {
                    ...focus,
                    title: updatingFocus
                };
            };
            return focus;
        });

        setTaskList(updatedFocus);
        setEditing(null);
        setUpdatingFocus("");
    };

    useEffect(() => {
        const allFocus = JSON.parse(localStorage.getItem("tasklist"));
        if(allFocus){
            setTaskList(allFocus);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem("tasklist", JSON.stringify(taskList));
    }, [taskList]);

    return (
        <>
            {disabled && <> {taskList.length == 0? (<>
                <h2 className='text-light' style={{fontSize: 35}}>What is your main focus for today?</h2>
                <form onSubmit={handleCreateFocus}>
                    <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)} id='inputFocus' />
                </form>
            </>) : (<ul className='d-flex text-center justify-content-center align-items-center'>
                {taskList.map(task => (<li key={task.id} className='d-flex justify-content-between align-items-center'>
                    {editing === task? (<form onSubmit={handleUpdateFocus}>
                        <h2 className='text-light' style={{fontSize: "35px"}}>What is your main focus for today?</h2>
                        <input type='text' value={updatingFocus} onChange={(e) => setUpdatingFocus(e.target.value)} id='inputFocus' />
                    </form>) : (<div className='justify-content-center align-items-center text-center'>
                        <p className='text-light' style={{fontSize: 21, fontWeight: 'bold'}} id='today'>TODAY</p>
                        <div className='d-flex form-check'>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={checked} onChange={handleChecked} />
                            <p className={checked? "completed" : "no_completed"} onDoubleClick={() => handleEditFocus(task)} style={{fontSize: 36}}>{task.title}</p>
                            <button className='btn btn-transparent text-light ms-3 mt-1' onClick={() => handleDeleteTask(task)}>
                                <i className="bi bi-x-square"></i>
                            </button>
                        </div>
                    </div>)}
                </li>))}
            </ul>)}   
            </>}
        
        </>
    )
}
