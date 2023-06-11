import React, { useEffect, useState } from 'react';
import { Timer } from './Timer';
import './pomodoro.css';

export const Pomodoro = () => {
    const [largeBreak, setLargeBreak] = useState(15*60);
    const [durationPomodoro, setDurationPomodoro] = useState(25*60);
    const [mode, setMode] = useState("FOCUS");
    const [timeLeft, setTimeLeft] = useState();
    const [isActive, setIsActive] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
        if(mode == "FOCUS"){
            setMode("FOCUS");
            setTimeLeft(durationPomodoro * 1000);
        }else if(mode === "BREAK"){
            setMode("BREAK");
            setTimeLeft(largeBreak * 1000);
        }
    }, [durationPomodoro, largeBreak]);

    const pomodoroTime = () => {
        setMode("FOCUS");
        setTimeLeft(durationPomodoro*1000);
    };

    const largeBreakTime = () => {
        setMode("BREAK");
        setTimeLeft(largeBreak*1000);
    };

    useEffect(() => {
        let interval = null;
        if(isActive && timeLeft > 1){
            if(mode == "FOCUS"){
                setMode("FOCUS");
                setTimeLeft(durationPomodoro * 1000 - timeSpent);
            }else if(mode == "BREAK"){
                setMode("BREAK");
                setTimeLeft(largeBreak * 1000 - timeSpent);
            }

            interval = setInterval(() => {
                setTimeSpent((spent) => spent + 1000);
            }, 1000);
        }else {
            clearInterval(interval);
        }

        if(timeLeft === 0) setTimeSpent(0);
        return () => clearInterval(interval);
    }, [isActive, timeSpent]);

    function toggleIsActive(){
        setIsActive(!isActive);
    }

    return (
        <div className='text-light justify-content-center align-items-center text-center' id='divGeneralPomodoro'>
            <hr style={{border: '3px solid white'}} color='white' />
            <div className='d-flex text-light justify-content-around text-center align-items-center'>
                <button className='btn btn-transparent text-light' onClick={pomodoroTime} style={{fontSize: 33}}>FOCUS</button>
                <button className='btn btn-transparent text-light' onClick={largeBreakTime} style={{fontSize: 33}}>BREAK</button>
            </div>
            <div className='text-light justify-content-center align-items-center text-center' style={{marginTop: -20}}>
                <Timer time={timeLeft} mode={mode} />
                <h2 className='text-light d-flex justify-content-center align-items-center text-center mt-1' style={{fontWeight: 'bold', fontSize: 40}}>{mode}</h2>
                <button className='btn btn-transparent border border-light rounded-pill text-light' onClick={toggleIsActive} id='buttonActive' style={{fontWeight: 'bold'}}>{isActive? "PAUSE" : "START"}</button>
            </div>
        </div>
    )
}
