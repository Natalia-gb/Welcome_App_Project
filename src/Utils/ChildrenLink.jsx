import React from 'react';
import { Link } from '../Components/Links/Link';

export const ChildrenLink = ({disabledWidget}) => {
    return (
        <>
            <Link disabled={disabledWidget} />
        </>
    )
}
