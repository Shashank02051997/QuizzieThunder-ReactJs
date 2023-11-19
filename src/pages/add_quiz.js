import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createQuizData } from "../network/quiz_api";
import { getAllQuizCategories } from "../network/quiz_category_api";

const AddQuiz = () => {
    const [quizCategoryListResult, setQuizCategoryListResult] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getQuizCategoryList();
    }, [])

    const getQuizCategoryList = async () => {

        setLoading(true);

        try {

            const response = await getAllQuizCategories();
            setQuizCategoryListResult(response.quiz_categories);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: { title: '', description: '', quiz_category: '' },
        initialErrors: {
            title: 'Title is required',
            description: 'Description is required',
            quiz_category: 'Quiz Category is required',
        },
        validate: (values) => {
            const errors = {};
            if (!values.title) {
                errors.title = 'Title is required';
            }
            if (!values.description) {
                errors.description = 'Description is required';
            }
            if (!values.quiz_category) {
                errors.quiz_category = 'Quiz Category is required';
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            const modifiedValues = {
                title: values.title,
                description: values.description,
                category: values.quiz_category,
            };
            handleSubmit(modifiedValues);
            setSubmitting(false);
        },
    });

    const handleSubmit = async (values) => {

        setLoading(true);

        try {
            const response = await createQuizData(values);
            toast.success(response.message);
            formik.resetForm();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-gray-50 h-screen">
                <section className=" mx-auto bg-white shadow-md mt-10">
                    <div className="py-8 px-4 mx-auto">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">Add a new quiz</h2>
                        <form className="mt-10" onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4 grid-cols-2 ">
                                <div className="w-full">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                    <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Static Mathematics Quiz" onChange={formik.handleChange}
                                        value={formik.values.title} />
                                    {formik.touched.title && formik.errors.title && (
                                        <div className="text-red-500">{formik.errors.title}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="quiz_category" className="block mb-2 text-sm font-medium text-gray-900">
                                        Quiz Category
                                    </label>
                                    <select
                                        name="quiz_category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={formik.handleChange}
                                        value={formik.values.quiz_category}>
                                        <option value="" disabled>Select a category</option>
                                        {quizCategoryListResult.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.quiz_category && formik.errors.quiz_category && (
                                        <div className="text-red-500">{formik.errors.quiz_category}</div>
                                    )}
                                </div>

                            </div>
                            <div className="w-full mt-4">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea name="description" id="description" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Write a quiz description..." onChange={formik.handleChange} value={formik.values.description}></textarea>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className={`inline-flex items-center px-5 py-2.5 mt-4  text-sm font-medium text-center text-white  rounded-lg focus:ring-4  ${formik.isValid ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300'}`}>
                                    {loading ? "Loading..." : "Add Quiz"}
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

export default AddQuiz;