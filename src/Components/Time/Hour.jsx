import React, { useState } from 'react';
import { useLocalStorage } from '../../Helpers/useLocalStorage';
import './hour.css';
import { Pomodoro } from '../Pomodoro/Pomodoro';

export const Hour = ({disabled}) => {

    const [checkedHour, setCheckedHour] = useLocalStorage("checkedHour", false);
    const [pomodoro, setPomodoro] = useLocalStorage("pomodoro", false);
    const time = new Date();
    
    return (
        <>
            {disabled && <div className='d-flex justify-content-evenly align-items-center' id='divHour'>
                <button type='button' className='btn btn-transparent bg-transparent border border-0' data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: 20}} id='buttonPomodoro'>
                    <i className="bi bi-arrow-left-right" id='arrow'></i>
                </button>
                <ul className='dropdown-menu bg-dark text-light' style={{width: 140.05, height: 40.8}}>
                    <div className='d-flex justify-content-around'>
                        <p className='text-light ms-1' style={{fontSize: 14}}>Pomodoro</p>
                        <div className="bg-secondary me-2 text-center text-light" style={{width: 40, height: 25, borderRadius: 15}}>Plus</div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="switchPomodoro" onChange={(e) => {setPomodoro(e.target.checked)}} checked={pomodoro} />
                        </div>
            
                    </div>
                </ul>
                
                {pomodoro? <Pomodoro /> : <p className='text-light' id='text_hour'>
                    {(checkedHour? time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false }) : time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).substring(0,5))}
                </p>}
                
                <button type="button" className="btn btn-transparent bg-transparent border border-0" data-bs-toggle="dropdown"
                    aria-expanded="false" style={{fontSize: 20}} id='buttonDots'>
                    <i className="bi bi-three-dots" id='dots'></i>
                </button>
                <ul className='dropdown-menu bg-dark text-light' style={{width: 157.05, height: 40.8}}>
                    <div className='d-flex justify-content-around'>
                        <p style={{fontSize: 14}}>24-hour clock</p>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={(e) => setCheckedHour(e.target.checked)} checked={checkedHour} />
                        </div>
                    </div>
                </ul>
            </div>}
        </>
    )
}
