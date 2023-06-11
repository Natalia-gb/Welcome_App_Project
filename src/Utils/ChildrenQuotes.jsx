import React from 'react';
import { QuoteText } from '../Components/Quotes/QuoteText';

export const ChildrenQuotes = (props) => {
    return (
        <QuoteText disabled={props.disabledWidget} />
    )
}
