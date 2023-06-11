import React, { useState, useEffect } from 'react';
import './greeting.css';
import { useLocalStorage } from '../../Helpers/useLocalStorage';

export const Greeting = ({disabled}) => {
    const [greeting, setGreeting] = useState("");
    const [editing, setEditing] = useState(false);
    const [userName, setUserName] = useLocalStorage("userName", "your name");
    const [inputValue, setInputValue] = useState("uour name");
    const [updating, setUpdating] = useState(false);

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            setUserName(inputValue);
            setInputValue("");
            setEditing(false);
        };
    };

    const handleUpdateDoubleClick = () => {
        setUpdating(true);
    };

    const handleUpdatedDown = (event) => {
        if(event.key === "Enter"){
            setUpdating(false);
        };
    };

    // Ajustar saludo en función de la hora
    const today = new Date();
    const adjustGreeting = () => {
        if (today.getHours() >= 0 && today.getHours() <= 11) {
            setGreeting("Good morning");
        } else if (today.getHours() >= 12 && today.getHours() <= 20) {
            setGreeting("Good afternoon");
        } else if (today.getHours() >= 21 && today.getHours() <= 24) {
            setGreeting("Good evening");
        }
    };

    useEffect(() => {
        adjustGreeting();
    }, []);

    return (
        <div style={{marginTop: 20}}>
            {disabled? editing? (<h1 style={{ fontSize: 54, marginTop: -50, marginBottom: 30 }}>
                {greeting}, <input type='text' placeholder='enter your name' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} autoFocus id='inputNameFocus' required />.
            </h1>) : (<h1 style={{ fontSize: 54, marginTop: -50, marginBottom: 30 }} onDoubleClick={handleUpdateDoubleClick}>
                {greeting}, <> {updating? (<input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} onKeyDown={handleUpdatedDown} autoFocus id='inputEditFocus' placeholder='enter your name' required />) : 
                userName}. </>
            </h1>) : ""}
        </div>
    )
}
