import React from 'react'

export const Switch = ({onChange, checked}) => {
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={onChange} checked={checked}/>
        </div>
    )
}
