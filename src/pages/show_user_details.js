import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";


const ShowUserDetails = () => {
    useEffect(() => {
        const loginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result:", loginResult);
        console.log("User Id = ", state);
        getUserDetail(loginResult)
    }, []);

    const [loading, setLoading] = useState(false);
    const [userResult, setUserResult] = useState({});
    const { state } = useLocation();

    const getUserDetail = async (data) => {
        const token = data.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);

        try {
            // Perform the API GET call using Axios
            const response = await axios.get(`${base_url}/user/64c2bc99cece5823091a87c2`, { headers });
            if (response.status === 200) {
                if (response.data && response.data.code) {
                }
                if (response.data && response.data.code === 200) {
                    setUserResult(response.data.user); // Set the userResult state with the data
                    toast.success("User Detail Fetched successfully");
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
                <div className="bg-gray-50 h-screen">
                    <section className="bg-white dark:bg-gray-900 shadow-md mt-10">
                        <div className="py-8 px-4 mx-auto ">
                            <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">Apple iMac 25"</h2>
                            <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white">$2999</p>
                            <dl>
                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">Standard glass ,3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, 16GB 2666MHz DDR4 memory, Radeon Pro 5500 XT with 8GB of GDDR6 memory, 256GB SSD storage, Gigabit Ethernet, Magic Mouse 2, Magic Keyboard - US.</dd>
                            </dl>
                            <dl className="flex items-center space-x-6">
                                <div>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">Electronics/PC</dd>
                                </div>
                                <div>
                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Item weight</dt>
                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">12kg</dd>
                                </div>
                            </dl>
                            <div className="flex items-center space-x-4 mt-8">
                                <button type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                    Edit
                                </button>
                                <button type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
                <ToastContainer />
            </div>

        </>

    );
}

export default ShowUserDetails;