import React from 'react'

export const Timer = ({time, mode}) => {
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);

    return (
        <div className='text-light text-center'>
            <h2 className='text-light mt-3' style={{fontSize: 140}}>{minutes}:{seconds.toString().length === 1? "0" + seconds : seconds}</h2>
        </div>
    )
}
