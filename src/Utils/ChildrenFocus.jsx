import React from 'react';
import { FocusTask } from '../Components/Focus/focusTask';

export const ChildrenFocus = ({disabledWidget}) => {
    return (
        <FocusTask disabled={disabledWidget} />
    )
}
