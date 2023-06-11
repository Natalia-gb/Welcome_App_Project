import React from 'react';
import { Weather } from '../Components/Weather/Weather';

export const ChildrenWeather = (props) => {
    return (
        <>
            <Weather disabled={props.disabledWidget} />
        </>
    )
}
