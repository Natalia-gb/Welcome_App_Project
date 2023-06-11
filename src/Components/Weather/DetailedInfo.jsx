import React from 'react'

export const DetailedInfo = ({disabled, temp_min, temp_max, pressure, visibility, wind_deg, wind_gust}) => {

    return (
        <div className='bg-dark text-light'>
            {disabled && <>
                <div className='d-flex justify-content-evenly'>
                    <div className='mt-2'>
                        <p className='text-secondary mb-1'>Temp. Min ·<span className='text-light ms-2'>{temp_min} Cº</span></p>
                        <p className='text-secondary mb-1'>Temp. Max ·<span className='text-light ms-2'>{temp_max} ºC</span></p>
                        <p className='text-secondary'>Pressure ·<span className='text-light ms-2'>{pressure} inHg</span></p>
                    </div>
                    <div className='mt-2'>
                        <p className='text-secondary mb-1'>Visibility ·<span className='text-light ms-1'>{visibility} mi</span></p>
                        <p className='text-secondary mb-1'>Wind. deg ·<span className='text-light ms-1'>{wind_deg} ºC</span></p>
                        <p className='text-secondary'>Wind. gust ·<span className='text-light ms-1'>{wind_gust}</span></p>
                    </div>
                </div>
            </>}
        </div>
    )
}
