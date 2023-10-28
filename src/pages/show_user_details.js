import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


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
                            <div className="flex flex-row mb-5">
                                <img
                                    className="w-24 h-24 rounded-full bg-gray-300"
                                    src={userResult.profilePic}
                                    alt="user"
                                />
                            </div>

                            <div className="grid gap-2 grid-cols-2 ">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">First name</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 fill-current bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg><span>{userResult.firstname}</span></p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Last name</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center"><svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 fill-current bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg><span>{userResult.lastname}</span></p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Email</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 fill-current bi bi-envelope-fill" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                        </svg>
                                        <span>{userResult.email}</span></p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Mobile Number</h2>

                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 fill-current bi bi-telephone-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg>
                                        <span>{userResult.mobile}</span></p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Mobile Number Verified</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">
                                        {userResult.isMobileNumberVerified ? (<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600 fill-current bi bi-patch-check-fill" viewBox="0 0 16 16">
                                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                        </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600 fill-current bi bi-x-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                        </svg>)}<span>{userResult.isMobileNumberVerified ? 'Verifed' : 'Not Verified'}</span>
                                    </p>

                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-Not Verifiedne text-gray-900">Email Verified</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">
                                        {userResult.isEmailVerified ? (<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600 fill-current bi bi-patch-check-fill" viewBox="0 0 16 16">
                                            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                        </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600 fill-current bi bi-x-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                        </svg>)}<span>{userResult.isEmailVerified ? 'Verifed' : 'Not Verified'}</span>
                                    </p>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">User Blocked</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">
                                        <svg class="w-4 h-4 text-gray-600 fill-current" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 0H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v2H1a1 1 0 0 0 0 2h1v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM13.929 17H7.071a.5.5 0 0 1-.5-.5 3.935 3.935 0 1 1 7.858 0 .5.5 0 0 1-.5.5Z" />
                                        </svg><span>{userResult.isBlocked ? 'Blocked' : 'Not Blocked'}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row space-x-4 mt-8">
                                <Link to="/admin/update-user-details" type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                    Edit
                                </Link>
                                <button type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>
                </div >
                <ToastContainer />
            </div >

        </>

    );
}

export default ShowUserDetails;