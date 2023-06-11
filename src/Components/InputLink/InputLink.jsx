import React, { useState } from 'react';

export const InputLink = ({disabled}) => {
    const [inputGoogleSearch, setInputGoogleSearch] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = `https://www.google.com/search?q=${inputGoogleSearch}`;
        window.open(`https://www.google.com/search?q=${inputGoogleSearch}`, '_blank');
    }


    return (
        <form className="d-flex mt-5 ms-2" id="divInputlinks" onSubmit={handleSubmit}>
            {disabled && <>
                <i className="bi bi-search mt-4" style={{ color: "white" }}></i>
                <input type="text" id="inputLinks" className="ms-3 mt-3" onChange={(e) => setInputGoogleSearch(e.target.value)} value={inputGoogleSearch} required />
                <i className="bi bi-google" id='google_logo'></i>
            </>} 
        </form>
    )
}