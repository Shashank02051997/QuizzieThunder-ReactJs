import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { base_url } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    useEffect(() => {
        const storedLoginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result:", storedLoginResult);
        setLoginResult(storedLoginResult);

    }, [])

    const [loginResult, setLoginResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: { firstname: '', lastname: '', email: '', mobile: '', password: '' },
        initialErrors: {
            firstname: 'Firstname is required',
            lastname: 'Lastname is required',
            email: 'Email is required',
            mobile: 'Mobile number is required',
            password: 'Password is required',
        },
        validate: (values) => {
            const errors = {};
            if (!values.firstname) {
                errors.firstname = 'Firstname is required';
            }
            if (!values.lastname) {
                errors.lastname = 'Lastname is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.mobile) {
                errors.mobile = 'Mobile number is required';
            } else if (!/^\d{10}$/.test(values.mobile)) {
                errors.mobile = 'Mobile number must be exactly 10 digits';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
        },
    });

    const handleSubmit = async (values) => {
        console.log('onSubmit', values);
        const token = loginResult.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);

        try {
            // Perform the API POST call using Axios
            const response = await axios.post(`${base_url}/user/register`, values, { headers });
            if (response.status === 200) {
                if (response.data && response.data.code) {
                    if (response.data.code === 404) {
                        toast.error(response.data.message);
                    } else {
                        toast.success(response.data.message);
                        formik.resetForm();
                    }
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
        <div>
            <div className="bg-gray-50 h-screen">
                <section className=" mx-auto bg-white shadow-md mt-10">
                    <div className="py-8 px-4 mx-auto">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">Add a new user</h2>
                        <form className="mt-10" onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4 grid-cols-2 ">
                                <div className="w-full">
                                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input type="text" name="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="First name" onChange={formik.handleChange}
                                        value={formik.values.firstname} />
                                    {formik.touched.firstname && formik.errors.firstname && (
                                        <div className="text-red-500">{formik.errors.firstname}</div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                    <input type="text" name="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Last name" onChange={formik.handleChange}
                                        value={formik.values.lastname} />
                                    {formik.touched.lastname && formik.errors.lastname && (
                                        <div className="text-red-500">{formik.errors.lastname}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email" onChange={formik.handleChange}
                                        value={formik.values.email} />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="text-red-500">{formik.errors.email}</div>
                                    )}
                                </div>
                                <div className="w-full">
                                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">Mobile Number</label>
                                    <input type="text" name="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="9898657888" onChange={formik.handleChange}
                                        value={formik.values.mobile} />
                                    {formik.touched.mobile && formik.errors.mobile && (
                                        <div className="text-red-500">{formik.errors.mobile}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="••••••••"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        />
                                        <span
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M2 12a10 10 0 1120 0 10 10 0 01-20 0z"
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                    </div>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-red-500">{formik.errors.password}</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className={`inline-flex items-center px-5 py-2.5 mt-4  text-sm font-medium text-center text-white  rounded-lg focus:ring-4  ${formik.isValid ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300'}`}>
                                    {loading ? "Loading..." : "Add User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    )
};

export default AddUser;