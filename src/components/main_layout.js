import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
    useEffect(() => {
        const loginResult = JSON.parse(sessionStorage.getItem('login_result'));
        console.log("Login Result Email:", loginResult);
    }, []);

    const navigationOptions = [
        { route_to: "/admin", label: "Admin" },
        { route_to: "/admin/user", label: "User" },
        // Add more navigation options as needed
    ];

    const initialComponent = navigationOptions[0].route_to; // Set the initial component based on the first item in navigationOptions

    const [activeComponent, setActiveComponent] = useState(initialComponent); // Default to "admin list"

    const handleComponentChange = (component) => {
        setActiveComponent(component);
    };

    return (
        <div className="antialiased bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-40">
                <div className="flex flex-wrap justify-end items-center">

                    <div className="flex items-center lg:order-2">

                        <button
                            type="button"
                            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="dropdown"
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                                alt="user"
                            />
                        </button>
                        {/*<!-- Dropdown menu -->*/}
                        <div
                            className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow "
                            id="dropdown"
                        >
                            <div className="py-3 px-4">
                                <span
                                    className="block text-sm font-semibold text-gray-900 "
                                >Neil Sims</span
                                >
                                <span
                                    className="block text-sm text-gray-900 truncate "
                                >name@flowbite.com</span
                                >
                            </div>
                            <ul
                                className="py-1 text-gray-700 "
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100 "
                                    >My profile</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100 "
                                    >Account settings</a
                                    >
                                </li>
                            </ul>
                            <ul
                                className="py-1 text-gray-700 "
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 "
                                    ><svg
                                        className="mr-2 w-5 h-5 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                            <path
                                                fill-rule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        My likes</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 "
                                    ><svg
                                        className="mr-2 w-5 h-5 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                            <path
                                                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                                            ></path>
                                        </svg>
                                        Collections</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 "
                                    >
                                        <span className="flex items-center">
                                            <svg
                                                aria-hidden="true"
                                                className="mr-2 w-5 h-5 text-primary-600 "
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                            Pro version
                                        </span>
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                            <ul
                                className="py-1 text-gray-700 "
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100 "
                                    >Sign out</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            {/*<!-- Sidebar -->*/}

            <aside
                className="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 "
                aria-label="Sidenav"
                id="drawer-navigation">

                <div className="overflow-y-auto px-3 h-full bg-white ">
                    <div className="pt-4 pb-8">
                        <a href="https://flowbite.com" class="flex items-center justify-start">
                            <img
                                src="images/app_logo.png"
                                class="mr-3 h-8"
                                alt="Quizzie Thunder Logo"
                            />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap ">Quizzie Thunder</span>
                        </a>
                    </div>
                    <ul className="space-y-2">
                        {navigationOptions.map((option) => (
                            <li key={option.route_to}>
                                <Link
                                    to={option.route_to}
                                    className={`flex items-center p-2 text-base font-medium ${activeComponent === option.route_to
                                        ? "text-gray-900 bg-gray-100"
                                        : "text-gray-500"
                                        } rounded-lg  hover:bg-gray-200 group`}
                                    onClick={() => handleComponentChange(option.route_to)}
                                >
                                    {option.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>

            </aside>

            <main className="p-4 md:ml-64 h-auto">
                <Outlet />
            </main>
        </div>
    )
};

export default MainLayout;