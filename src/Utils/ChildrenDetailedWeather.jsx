import React from 'react';
import { DetailedInfo } from '../Components/Weather/DetailedInfo';

export const ChildrenDetailedWeather = ({disabledWidget, temp_min, temp_max, pressure, visibility, wind_deg, wind_gust}) => {
    return (
        <>
            <DetailedInfo disabled={disabledWidget} temp_min={temp_min} temp_max={temp_max} pressure={pressure} visibility={visibility} wind_deg={wind_deg} wind_gust={wind_gust} />
        </>
    )
}
