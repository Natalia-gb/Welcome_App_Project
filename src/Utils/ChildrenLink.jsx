import React from 'react';
import { Link } from '../Components/Links/Link';

export const ChildrenLink = (props) => {
    return (
        <>
            <Link disabled={props.disabledWidget} />
        </>
    )
}
