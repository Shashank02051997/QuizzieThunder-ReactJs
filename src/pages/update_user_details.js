import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { base_url } from "../utils/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from "react-router-dom";

const UpdateUserDetails = () => {
    const { state } = useLocation();
    const [loginResult, setLoginResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userResult, setUserResult] = useState({});

    useEffect(() => {
        const storedLoginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result:", storedLoginResult);
        setLoginResult(storedLoginResult);
        setUserResult(state.user);
    }, []);

    const formik = useFormik({
        initialValues: {
            firstname: userResult.firstname || '',
            lastname: userResult.lastname || '',
            email: userResult.email || '',
            mobile: userResult.mobile || '',
            about: userResult.about || '',
            mobile_number_verified_status: userResult.isMobileNumberVerified ? 'Verified' : 'Not Verified',
            email_verified_status: userResult.isEmailVerified ? 'Verified' : 'Not Verified',
            user_blocked_status: userResult.isBlocked ? 'Blocked' : 'Not Blocked',
        },
        enableReinitialize: true,
        validateOnMount: true,
        initialErrors: {
            firstname: 'Firstname is required',
            lastname: 'Lastname is required',
            email: 'Email is required',
            mobile: 'Mobile number is required',
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

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            const modifiedValues = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                mobile: values.mobile,
                about: values.about,
                isMobileNumberVerified: values.mobile_number_verified_status === "Verified",
                isEmailVerified: values.email_verified_status === "Verified",
                isBlocked: values.user_blocked_status === "Blocked",
            };
            handleSubmit(modifiedValues);
            setSubmitting(false);
        },
    });

    const handleSubmit = async (values) => {
        const token = loginResult.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);

        try {
            // Perform the API PUT call using Axios
            const response = await axios.put(`${base_url}/user/update/${userResult._id}`, values, { headers });
            if (response.status === 200) {
                if (response.data && response.data.code) {
                    if (response.data.code === 404) {
                        toast.error(response.data.message);
                    } else {
                        const result = response.data.result;
                        console.log(result);
                        toast.success(response.data.message);
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
                        <h2 className="mb-4 text-xl font-bold text-gray-900">Update User Details</h2>
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
                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900">About</label>
                                <textarea name="about" id="about" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Write about yourself..." onChange={formik.handleChange} value={formik.values.about}></textarea>
                            </div>

                            <div className="grid gap-4 grid-cols-2 mt-4">
                                <div className="w-full">
                                    <label htmlFor="mobile_number_verified_status" className="block mb-4 text-sm font-medium text-gray-900">Mobile Number Verified</label>

                                    <div class="flex">

                                        <div class="flex items-center mr-4">
                                            <input id="mobile_number_verified_status_option_1" type="radio" name="mobile_number_verified_status" value="Verified" class="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300" checked={formik.values['mobile_number_verified_status'] === 'Verified'}
                                                onChange={formik.handleChange} />
                                            <label for="mobile_number_verified_status_option_1" class="block ml-2 text-sm font-medium text-gray-900">
                                                Verified
                                            </label>
                                        </div>

                                        <div class="flex items-center mr-4">
                                            <input id="mobile_number_verified_status_option_2" type="radio" name="mobile_number_verified_status" value="Not Verified" class="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300" checked={formik.values['mobile_number_verified_status'] === 'Not Verified'}
                                                onChange={formik.handleChange} />
                                            <label for="mobile_number_verified_status_option_2" class="block ml-2 text-sm font-medium text-gray-900">
                                                Not Verified
                                            </label>
                                        </div>

                                    </div>

                                </div>

                                <div className="w-full">
                                    <label htmlFor="email_verified_status" className="block mb-4 text-sm font-medium text-gray-900">Email Verified</label>

                                    <div class="flex">

                                        <div class="flex items-center mr-4">
                                            <input id="email_verified_status_option_1" type="radio" name="email_verified_status" value="Verified" class="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300" checked={formik.values['email_verified_status'] === 'Verified'}
                                                onChange={formik.handleChange} />
                                            <label for="email_verified_status_option_1" class="block ml-2 text-sm font-medium text-gray-900">
                                                Verified
                                            </label>
                                        </div>

                                        <div class="flex items-center mr-4">
                                            <input id="email_verified_status_option_2" type="radio" name="email_verified_status" value="Not Verified" class="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300" checked={formik.values['email_verified_status'] === 'Not Verified'}
                                                onChange={formik.handleChange} />
                                            <label for="email_verified_status_option_2" class="block ml-2 text-sm font-medium text-gray-900">
                                                Not Verified
                                            </label>
                                        </div>

                                    </div>

                                </div>

                                <div className="w-full">
                                    <label htmlFor="user_blocked_status" className="block mb-4 text-sm font-medium text-gray-900">User Blocked</label>

                                    <div class="flex">

                                        <div class="flex items-center mr-4">
                                            <input id="user_blocked_status_option_1" type="radio" name="user_blocked_status" value="Blocked" class="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300" checked={formik.values['user_blocked_status'] === 'Blocked'}
                                                onChange={formik.handleChange} />
                                            <label for="user_blocked_status_option_1" class="block ml-2 text-sm font-medium text-gray-900">
                                                Blocked
                                            </label>
                                        </div>

                                        <div class="flex items-center mr-4">
                                            <input id="user_blocked_status_option_2" type="radio" name="user_blocked_status" value="Not Blocked" class="w-5 h-5 border-gray-300 focus:ring-2 focus:ring-blue-300" checked={formik.values['user_blocked_status'] === 'Not Blocked'}
                                                onChange={formik.handleChange} />
                                            <label for="user_blocked_status_option_2" class="block ml-2 text-sm font-medium text-gray-900">
                                                Not Blocked
                                            </label>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="flex justify-center mt-4">
                                <button type="submit" className={`inline-flex items-center px-5 py-2.5 mt-4  text-sm font-medium text-center text-white  rounded-lg focus:ring-4  ${formik.isValid ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300'}`}>
                                    {loading ? "Loading..." : "Update"}
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

export default UpdateUserDetails;