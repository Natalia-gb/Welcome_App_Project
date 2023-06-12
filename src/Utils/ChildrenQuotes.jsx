import React from 'react';
import { QuoteText } from '../Components/Quotes/QuoteText';

export const ChildrenQuotes = ({disabledWidget}) => {
    return (
        <QuoteText disabled={disabledWidget} />
    )
}
