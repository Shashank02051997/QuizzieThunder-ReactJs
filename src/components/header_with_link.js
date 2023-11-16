import React from 'react';
import { Link } from 'react-router-dom';

const HeaderWithLink = ({ title, linkTo }) => {
    return (
        <div className="flex flex-row items-center justify-between space-y-3 p-4">
            <h1 className="text-2xl font-medium">{title}</h1>
            {linkTo ? (<Link
                to={linkTo}
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                Create New
            </Link>) : null}
        </div>
    );
};

export default HeaderWithLink;