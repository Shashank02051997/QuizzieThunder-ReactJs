import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { getQuizCategoryDetailData, updateQuizCategoryData } from "../network/quiz_category_api";
import Loader from "../components/loader";

const UpdateQuizCategory = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [quizCategoryResult, setQuizCategoryResult] = useState({});

    useEffect(() => {
        getQuizCategoryDetail();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: quizCategoryResult.title || '',
        },
        enableReinitialize: true,
        validateOnMount: true,
        initialErrors: {
            title: 'Title is required'
        },
        validate: (values) => {
            const errors = {};
            if (!values.title) {
                errors.title = 'Title is required';
            }
            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
        },
    });

    const getQuizCategoryDetail = async () => {

        setLoading(true);

        try {
            const response = await getQuizCategoryDetailData(id);
            setQuizCategoryResult(response.quizCategory);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {

        setLoading(true);

        try {

            const response = await updateQuizCategoryData(id, values);
            const result = response.result;
            console.log(result);
            toast.success(response.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/*<!-- Loader -->*/}
            <Loader isShow={loading} />

            {/*<!-- Start block -->*/}
            <div className="bg-gray-50 h-screen">
                <section className=" mx-auto bg-white shadow-md mt-10">
                    <div className="py-8 px-4 mx-auto">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">Update Quiz Category</h2>
                        <form className="mt-10" onSubmit={formik.handleSubmit}>
                            <div className="w-full">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Quiz Catgory Title</label>
                                <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="General Knowledge" onChange={formik.handleChange}
                                    value={formik.values.title} />
                                {formik.touched.title && formik.errors.title && (
                                    <div className="text-red-500">{formik.errors.title}</div>
                                )}
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
            {/*<!-- End block -->*/}

            {/*<!-- Toast -->*/}
            <ToastContainer />
        </div>
    )
};

export default UpdateQuizCategory;