import React from 'react';
import { Weather } from '../Components/Weather/Weather';

export const ChildrenWeather = ({disabledWidget}) => {
    return (
        <>
            <Weather disabled={disabledWidget} />
        </>
    )
}
