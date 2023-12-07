import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderWithLink = ({ title, total, linkTo, searchPlcehoder, onSearch, displayFilterBtn, onFilter }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = () => {
        onSearch(searchValue);
    };

    return (
        <div className="flex flex-row items-center justify-between space-y-3 p-4">
            <h1 className="text-2xl font-medium">{title}</h1>

            <div className="flex flex-row items-center ">
                <div class="flex flex-row items-center mr-8">
                    <input
                        className="w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder={searchPlcehoder}
                        type="text"
                        name="search"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    <div>
                        <button onClick={handleSearchSubmit} type="submit" class="py-2 px-3 text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">Search</button>
                    </div>
                </div>
                <button
                    onClick={onFilter}
                    type="button"
                    className={`${displayFilterBtn ? 'block' : 'hidden'} mr-8 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none`}>
                    <i className="fa fa-filter mr-2"></i>Filter
                </button>
                <h3 className="mr-8 text-lg font-medium">Total : {total}</h3>
                {linkTo ? (<Link
                    to={linkTo}
                    type="button"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                    <i className="fa fa-plus mr-2"></i>Create New
                </Link>) : null}
            </div>

        </div>
    );
};

export default HeaderWithLink;