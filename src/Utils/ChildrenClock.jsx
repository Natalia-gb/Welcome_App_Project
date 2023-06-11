import React from 'react';
import { Hour } from '../Components/Time/Hour';

export const ChildrenClock = ({disabledWidget}) => {
    return (
        <Hour disabled={disabledWidget} />
    )
}
