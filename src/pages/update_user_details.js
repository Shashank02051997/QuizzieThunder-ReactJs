import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { base_url } from "../utils/base_url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserDetails = () => {
    useEffect(() => {
        const storedLoginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result:", storedLoginResult);
        setLoginResult(storedLoginResult);

    }, [])

    const [loginResult, setLoginResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: { firstname: '', lastname: '', email: '', mobile: '' },
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
            const response = await axios.put(`${base_url}/user/update/64c2bc99cece5823091a87c2`, values, headers);
            if (response.status === 200) {
                if (response.data && response.data.code) {
                    if (response.data.code === 404) {
                        toast.error(response.data.message);
                    } else {
                        const result = response.data.result;
                        console.log(result);
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

export default EditUserDetails;