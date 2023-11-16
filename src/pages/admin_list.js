import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import HeaderWithLink from "../components/header_with_link";
import Loader from "../components/loader";
const AdminList = () => {
    useEffect(() => {
        const loginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result:", loginResult);
        getAdminList(loginResult)

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

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [adminListResult, setAdminListResult] = useState([]);
    const [activeRowDropdown, setActiveRowDropdown] = useState(null);
    // Ref to store a reference to the dropdown container
    const rowDropdownRef = useRef(null);


    const toggleRowDropdown = (rowId) => {
        setActiveRowDropdown(rowId === activeRowDropdown ? null : rowId);
    };

    const closeRowDropDown = () => {
        //setActiveRowDropdown(null);
    };

    const openUserPreview = (admin) => {
        navigate(`/admin/show-user-details/${admin._id}`);
    };

    const getAdminList = async (data) => {
        const token = data.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);

        try {
            // Perform the API GET call using Axios
            const response = await axios.get(`${base_url}/user/all-users?isAdmin=true`, { headers });
            if (response.status === 200) {
                if (response.data && response.data.code === 200) {
                    setAdminListResult(response.data.users);
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
                <section className="bg-gray-50 antialiased mt-10">
                    <HeaderWithLink title={"Admin List"} />
                    <Loader isShow={loading} />
                    {!loading ? (
                        <div className="mx-auto max-w-screen-xl px-4">

                            <div className="bg-white relative shadow-md rounded-lg">

                                <div className="overflow-x-visible">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3">Id</th>
                                                <th scope="col" className="px-4 py-3">Name</th>
                                                <th scope="col" className="px-4 py-3">Email</th>
                                                <th scope="col" className="px-4 py-3">Mobile</th>
                                                <th scope="col" className="px-4 py-3">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adminListResult.map((admin, index) => (
                                                <tr key={admin._id} className="border-b relative">
                                                    <th type="button" onClick={() => openUserPreview(admin)} className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap max-w-[10rem] truncate hover:text-primary-700">{admin._id}</th>
                                                    <td className="px-4 py-3 max-w-[10rem] truncate">{admin.firstname} {admin.lastname}</td>
                                                    <td className="px-4 py-3 max-w-[15rem] truncate">{admin.email}</td>
                                                    <td className="px-4 py-3">{admin.mobile}</td>
                                                    <td className="px-4 py-3 relative">
                                                        <button onClick={() => toggleRowDropdown(admin._id)} id={`apple-imac-27-dropdown-button-${admin._id}`} className="inline-flex items-center text-sm font-medium hover:bg-gray-100 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none " type="button">
                                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                            </svg>
                                                        </button>
                                                        {/* Drop down */}
                                                        <div ref={rowDropdownRef} id={`apple-imac-27-dropdown-${admin._id}`} className={`z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow absolute right-0 ${activeRowDropdown === admin._id ? 'block' : 'hidden'} ${index >= adminListResult.length - 2 ? '-top-10' : 'top-10'}`}>
                                                            <ul className="py-1 text-sm" aria-labelledby={`apple-imac-27-dropdown-button-${admin._id}`}>
                                                                <li>
                                                                    <button onClick={() => openUserPreview(admin)} type="button" className="flex w-full items-center py-2 px-4 hover:bg-gray-100 text-gray-700">
                                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                        </svg>
                                                                        Preview
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

                {/*<!-- Toast -->*/}
                <ToastContainer />
            </div>

        </>
    )
};

export default AdminList;