import React from 'react';
import { Todo } from '../Components/Todo/Todo';

export const ChildrenToDo = (props) => {
    return (
        <Todo disabled={props.disabledWidget} />
    )
}
