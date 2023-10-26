import React, { useState } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { base_url } from "../utils/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { mobile: '', password: '' },
        validate: (values) => {
            const errors = {};
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values) => {

        setLoading(true);

        try {
            // Perform the API POST call using Axios
            const response = await axios.post(`${base_url}/user/admin-login`, values);
            if (response.status === 200) {
                if (response.data && response.data.code) {
                    const codeValue = response.data.code;
                    if (codeValue === 404) {
                        toast.error(response.data.message);
                    } else {
                        const loginResult = response.data.result;
                        toast.success(response.data.message);
                        formik.resetForm();
                        //console.log("Login Result:", loginResult);
                        sessionStorage.setItem("login_result", JSON.stringify(loginResult));
                        navigate("/admin");
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
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-3/4 flex flex-row mx-auto bg-white rounded-lg shadow">
                        <div className="w-1/2 bg-gray-200 flex items-center justify-center">
                            <img src="images/welcome.svg" alt="Login" className="max-w-full max-h-full p-6" />
                        </div>
                        <div className="w-1/2 p-6 space-y-4 md:space-y-6">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-blue-600 md:text-2xl text-center mb-10">
                                Admin Login
                            </h1>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                                <div>
                                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
                                        Your mobile number
                                    </label>
                                    <input
                                        type="text"
                                        name="mobile"
                                        id="mobile"
                                        onChange={formik.handleChange}
                                        value={formik.values.mobile}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="8987898765"
                                    />
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
                                            id="password"
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

                                <button
                                    type="submit"
                                    className={`w-full ${formik.isValid ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300'} text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                                    disabled={loading}
                                >
                                    {loading ? "Loading..." : "Sign in"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <p className="mt-8 text-gray-500 font-normal">
                        Made with ❤️ by <span className="text-primary-700">Shashank</span>
                    </p>
                </div>
            </section>
            <ToastContainer />
        </div>

    );
};

export default Login;
