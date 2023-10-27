import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const UserList = () => {
    useEffect(() => {
        const loginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result Email:", loginResult);
        getUserList(loginResult)

        // Add event listener to the document to close the dropdown on outside click
        function handleClickOutside(event) {
            if (rowDropdownRef.current && !rowDropdownRef.current.contains(event.target)) {
                closeRowDropDown();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [loading, setLoading] = useState(false);
    const [userListResult, setUserListResult] = useState([]);
    const [activeRowDropdown, setActiveRowDropdown] = useState(null);
    // Ref to store a reference to the dropdown container
    const rowDropdownRef = useRef(null);


    const toggleRowDropdown = (rowId) => {
        setActiveRowDropdown(rowId === activeRowDropdown ? null : rowId);
    };

    const closeRowDropDown = () => {
        //setActiveRowDropdown(null);
    };

    const getUserList = async (data) => {
        const token = data.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);

        try {
            // Perform the API GET call using Axios
            const response = await axios.get(`${base_url}/user/all-users`, { headers });
            if (response.status === 200) {
                if (response.data && response.data.code) {
                }
                if (response.data && response.data.code === 200) {
                    setUserListResult(response.data.users); // Set the userListResult state with the data
                    toast.success("List Fetched successfully");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                // Handle errors, e.g., display an error message
                console.error("Error:", response.data);
            }
        } catch (error) {
            // Handle network errors
            console.error("Network Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                {/*<!-- Start block -->*/}
                <section className="bg-gray-50 p-3 sm:p-5 antialiased mt-10">
                    <div className="flex flex-row md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <h1 className="text-3xl font-medium">User List</h1>
                        <Link to="/admin/add-user" type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none">
                            Create New
                        </Link>
                    </div>
                    {loading ? (
                        <div className="mx-auto max-w-screen-xl max-h-screen px-4  flex-col items-center justify-center text-center">
                            <div role="status">
                                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : null}
                    {!loading ? (
                        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                            {/*<!-- Start coding here -->*/}
                            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-4">Id</th>
                                                <th scope="col" className="px-4 py-3">Name</th>
                                                <th scope="col" className="px-4 py-3">Email</th>
                                                <th scope="col" className="px-4 py-3">Mobile</th>
                                                <th scope="col" className="px-4 py-3">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userListResult.map((user, index) => (
                                                <tr key={user._id} className="border-b relative">
                                                    <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap max-w-[10rem] truncate">{user._id}</th>
                                                    <td className="px-4 py-3 max-w-[10rem] truncate">{user.firstname} {user.lastname}</td>
                                                    <td className="px-4 py-3 max-w-[15rem] truncate">{user.email}</td>
                                                    <td className="px-4 py-3">{user.mobile}</td>
                                                    <td className="px-4 py-3 relative">
                                                        <button onClick={() => toggleRowDropdown(user._id)} id={`apple-imac-27-dropdown-button-${user._id}`} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none " type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        {/* Drop down */}
                                                        <div ref={rowDropdownRef} id={`apple-imac-27-dropdown-${user._id}`} className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute right-0 ${activeRowDropdown === user._id ? 'block' : 'hidden'} ${index >= userListResult.length - 2 ? '-top-28' : 'top-10'}`}>
                                                            <ul className="py-1 text-sm" aria-labelledby={`apple-imac-27-dropdown-button-${user._id}`}>
                                                                <li>
                                                                    <Link to="/admin/edit-user-details" type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700 ">
                                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                                                        </svg>
                                                                        Edit
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={{
                                                                        pathname: "/admin/show-user-details", state: user._id,
                                                                    }} type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700">
                                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                        </svg>
                                                                        Preview
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <button type="button" data-modal-target="deleteModal" data-modal-toggle="deleteModal" class="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-red-500">
                                                                        <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                                                        </svg>
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}

                </section>
                {/*<!-- End block -->*/}

                {/*<!-- Delete modal -->*/}
                <div id="deleteModal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        {/*<!-- Modal content -->*/}
                        <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
                            <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="deleteModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <svg className="text-gray-400 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <p className="mb-4 text-gray-500">Are you sure you want to delete this item?</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 ">No, cancel</button>
                                <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 ">Yes, I'm sure</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

        </>
    )
};

export default UserList;