import React from 'react';
import { Greeting } from '../Components/Greeting/Greeting';

export const ChildrenGreeting = ({disabledWidget}) => {
    return (
        <Greeting disabled={disabledWidget} />
    )
}
