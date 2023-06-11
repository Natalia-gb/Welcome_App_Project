import React, { useEffect, useState } from 'react';
import './quote.css';

export const QuoteText = ({disabled}) => {
    const [arrayQuotes, setArrayQuotes] = useState([]);
    const [currentQuote, setCurrentQuote] = useState(null);
    const [loadingQuote, setLoadingQuote] = useState(true);

    useEffect(() => {
        fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
            .then(response => response.json())
            .then(result => {setArrayQuotes(result.quotes); setLoadingQuote(false)})
            .catch(error => console.log(error))
    }, []);

    const getRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * arrayQuotes.length);
        setCurrentQuote(arrayQuotes[randomIndex]);
    }

    useEffect(() => {
        if(arrayQuotes.length > 0){
            getRandomQuote();
            setLoadingQuote(false);
        }
    }, [arrayQuotes]);

    return (
        <>
        {disabled && 
            <>
                <button className="btn btn-transparent text-light me-3" style={{fontSize: 25}} onClick={getRandomQuote}>
                    <i className="bi bi-arrow-repeat"></i>
                </button>

                <div id='quote_container'>
                    {loadingQuote? "" : currentQuote && (
                        <>
                            <p style={{fontSize: 18, marginBottom: -18}} id="quote">"{currentQuote.quote}"</p>
                            <p style={{fontSize: 14}} id="author">"{currentQuote.author}"</p>
                        </>
                    )}
                </div>
            </>}
        </>
    )
}
