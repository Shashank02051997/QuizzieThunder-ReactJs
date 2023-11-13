import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../components/delete_modal";


const ShowQuizDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [quizResult, setQuizResult] = useState({});
    const [deletingQuiz, setDeletingQuiz] = useState(null);

    useEffect(() => {
        const loginResult = JSON.parse(localStorage.getItem('login_result'));
        console.log("Login Result:", loginResult);
        getQuizDetail(loginResult)
    }, []);

    const openEditQuiz = (quiz) => {
        navigate(`/admin/update-quiz/${quiz._id}`);
    };

    const openQuestionList = (quiz) => {
        navigate(`/admin/questions/${quiz._id}`);
    };

    const handleDeleteClick = (quiz) => {
        setDeletingQuiz(quiz);
    };

    const handleCloseModal = () => {
        setDeletingQuiz(null)
    };

    const confirmDelete = async () => {
        /*const token = loginResult.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);*/
    };

    const getQuizDetail = async (data) => {
        const token = data.token;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setLoading(true);

        try {
            // Perform the API GET call using Axios
            const response = await axios.get(`${base_url}/quiz/${id}`, { headers });
            if (response.status === 200) {
                if (response.data && response.data.code === 200) {
                    setQuizResult(response.data.quiz);
                    toast.success("Quiz Detail Fetched successfully");
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
                <div className="bg-gray-50 h-screen">
                    <section className="bg-white shadow-md mt-10">
                        <div className="py-8 px-4 mx-auto ">

                            <div className="w-full flex flex-row mb-1">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Quiz Id</h2>
                                    <button type="button" onClick={() => openQuestionList(quizResult)} className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center hover:text-primary-700">{quizResult._id}</button>
                                </div>
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Quiz Category</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">{quizResult.category ? quizResult.category.title : "No Category Assigned"}</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row mb-1">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Quiz Title</h2>
                                    <button type="button" onClick={() => openQuestionList(quizResult)} className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center hover:text-primary-700">{quizResult.title}</button>
                                </div>
                            </div>

                            <div className="w-full flex flex-row mb-1">
                                <div className="w-full flex flex-col">
                                    <h2 className="mb-2 font-semibold leading-none text-gray-900">Quiz Description</h2>
                                    <p className="mb-4 font-medium text-gray-600 flex flex-row space-x-2 items-center">{quizResult.description ? quizResult.description : '--'}</p>
                                </div>
                            </div>

                            <div className="flex flex-row space-x-4 mt-8">
                                <button onClick={() => openEditQuiz(quizResult)} type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteClick(quizResult)} type="button" className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <svg aria-hidden="true" className="w-5 h-5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>
                </div >
                {/*<!-- End block -->*/}

                {/*<!-- Delete modal -->*/}
                <DeleteModal isOpen={deletingQuiz} onCancel={handleCloseModal}
                    onConfirm={confirmDelete} />

                {/*<!-- Toast -->*/}
                <ToastContainer />
            </div >
        </>

    );
}

export default ShowQuizDetails;