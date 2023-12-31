import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { optionList } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { createQuestionData } from "../network/question_api";
import { getAllQuizData, getQuizDetailData } from "../network/quiz_api";
import Loader from "../components/loader";

const AddQuestion = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [quizListResult, setQuizListResult] = useState([]);
    const [quizResult, setQuizResult] = useState({});

    useEffect(() => {
        getQuizList();
    }, [])

    const getQuizList = async () => {

        setLoading(true);

        try {
            const response = await getAllQuizData();
            setQuizListResult(response.quizzes);
            await getQuizDetail();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getQuizDetail = async () => {
        setLoading(true);

        try {
            const response = await getQuizDetailData(id);
            setQuizResult(response.quiz);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: { question: '', quiz: quizResult._id || '', option_a: '', option_b: '', option_c: '', option_d: '', correct_option: '' },
        initialErrors: {
            question: 'Question is required',
            quiz: 'Quiz is required',
            option_a: 'Option A is required',
            option_b: 'Option B is required',
            option_c: 'Option C is required',
            option_d: 'Option D is required',
            correct_option: 'Correct option is required'
        },
        enableReinitialize: true,
        validateOnMount: true,
        validate: (values) => {
            const errors = {};
            if (!values.question) {
                errors.question = 'Question is required';
            }
            if (!values.quiz) {
                errors.quiz = 'Quiz is required';
            }
            if (!values.option_a) {
                errors.option_a = 'Option A is required';
            }
            if (!values.option_b) {
                errors.option_b = 'Option B is required';
            }
            if (!values.option_c) {
                errors.option_c = 'Option C is required';
            }
            if (!values.option_d) {
                errors.option_d = 'Option D is required';
            }
            if (!values.correct_option) {
                errors.correct_option = 'Correct option is required';
            }

            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            const modifiedValues = {
                quiz: values.quiz,
                question: values.question,
                correctOptionIndex: values.correct_option,
                options: [values.option_a, values.option_b, values.option_c, values.option_d]
            };
            handleSubmit(modifiedValues);
            setSubmitting(false);
        },
    });

    const handleSubmit = async (values) => {
        console.log('onSubmit', values);
        setLoading(true);

        try {
            const response = await createQuestionData(values);
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
            {/*<!-- Loader -->*/}
            <Loader isShow={loading} />

            {/*<!-- Start block -->*/}
            <div className="bg-gray-50 h-screen">
                <section className=" mx-auto bg-white shadow-md mt-10">
                    <div className="py-8 px-4 mx-auto">
                        <h2 className="mb-4 text-xl font-bold text-gray-900">Add a new question</h2>
                        <form className="mt-10" onSubmit={formik.handleSubmit}>
                            <div className="grid gap-4 grid-cols-2 ">
                                <div className="w-full">
                                    <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900">Question</label>
                                    <input type="text" name="question" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Who is the prime minister of India?" onChange={formik.handleChange}
                                        value={formik.values.question} />
                                    {formik.touched.question && formik.errors.question && (
                                        <div className="text-red-500">{formik.errors.question}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="quiz" className="block mb-2 text-sm font-medium text-gray-900">
                                        Quiz
                                    </label>
                                    <select
                                        name="quiz"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={formik.handleChange}
                                        value={formik.values.quiz}>
                                        <option value="" disabled>Select a quiz</option>
                                        {quizListResult.map((quiz) => (
                                            <option key={quiz._id} value={quiz._id}>
                                                {quiz.title}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.quiz && formik.errors.quiz && (
                                        <div className="text-red-500">{formik.errors.quiz}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="option_a" className="block mb-2 text-sm font-medium text-gray-900">Option A</label>
                                    <input type="text" name="option_a" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Narendra Modi" onChange={formik.handleChange}
                                        value={formik.values.option_a} />
                                    {formik.touched.option_a && formik.errors.option_a && (
                                        <div className="text-red-500">{formik.errors.option_a}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="option_b" className="block mb-2 text-sm font-medium text-gray-900">Option B</label>
                                    <input type="text" name="option_b" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Rahul Gandhi" onChange={formik.handleChange}
                                        value={formik.values.option_b} />
                                    {formik.touched.option_b && formik.errors.option_b && (
                                        <div className="text-red-500">{formik.errors.option_b}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="option_c" className="block mb-2 text-sm font-medium text-gray-900">Option C</label>
                                    <input type="text" name="option_c" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Amit Shah" onChange={formik.handleChange}
                                        value={formik.values.option_c} />
                                    {formik.touched.option_c && formik.errors.option_c && (
                                        <div className="text-red-500">{formik.errors.option_c}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="option_d" className="block mb-2 text-sm font-medium text-gray-900">Option D</label>
                                    <input type="text" name="option_d" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Arvind Kejriwal" onChange={formik.handleChange}
                                        value={formik.values.option_d} />
                                    {formik.touched.option_d && formik.errors.option_d && (
                                        <div className="text-red-500">{formik.errors.option_d}</div>
                                    )}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="quiz" className="block mb-2 text-sm font-medium text-gray-900">
                                        Correct Option
                                    </label>
                                    <select
                                        name="correct_option"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        onChange={formik.handleChange}
                                        value={formik.values.correct_option}>
                                        <option value="" disabled>Select a option</option>
                                        {optionList.map((data) => (
                                            <option key={data.id} value={data.id}>
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.correct_option && formik.errors.correct_option && (
                                        <div className="text-red-500">{formik.errors.correct_option}</div>
                                    )}
                                </div>

                            </div>
                            <div className="flex justify-center mt-4">
                                <button type="submit" className={`inline-flex items-center px-5 py-2.5 mt-4  text-sm font-medium text-center text-white  rounded-lg focus:ring-4  ${formik.isValid ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-300' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-300'}`}>
                                    {loading ? "Loading..." : "Add Question"}
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

export default AddQuestion;