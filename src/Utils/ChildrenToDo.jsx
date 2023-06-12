import React from 'react';
import { Todo } from '../Components/Todo/Todo';

export const ChildrenToDo = ({disabledWidget}) => {
    return (
        <Todo disabled={disabledWidget} />
    )
}
